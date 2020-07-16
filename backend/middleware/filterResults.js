const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");
const Hospital = require("../models/Hospital");
// filter doctors and hospitals by location or fields
const filterResults = (model, populate) => async (req, res, next) => {
  let query;
  let locQuery;

  // Copy the query from request object
  const requestQuery = { ...req.query };
  // allowed models for location search
  const allowedLocSearch = ["Hospital", "User"];
  // address and zipcode are mandatory for location search
  if (
    req.query.zipcode &&
    req.query.address &&
    allowedLocSearch.includes(model.modelName)
  ) {
    const { address, zipcode } = requestQuery;
    // distance to search in. Default is 10km
    const distance = parseInt(req.query.distance, 10) || 10;
    const fullAddress = address + ", " + zipcode;
    const loc = await geocoder.geocode(fullAddress);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;
    // Calc radius using radians
    // Divide dist by radius of Earth
    // Earth Radius = 3,963 mi / 6,378 km
    let radius = distance / 6378;
    locQuery = {
      address_geojson: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
    };
  }

  // Keywords using by mongoose for filtering
  const fieldsToRemove = [
    "sort",
    "select",
    "page",
    "limit",
    "address",
    "zipcode",
    "distance"
  ];

  // Remove mongoose keywords before querying database
  fieldsToRemove.forEach((param) => delete requestQuery[param]);

  // if we search for Users we can only get doctors
  // Future change in case doctors need to search for Users
  // Probably the best way is to add more parameters to the filter function.
  if(model.modelName === "User") {
    requestQuery.role = "doctor";
  }
  // Create query string
  let queryStr = JSON.stringify(requestQuery);

  // Create query operators ($gt, $gte, $or etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Finding query in db
  if (locQuery) {
    if (model.modelName === "Hospital") {
      query = model.find({ ...JSON.parse(queryStr), ...locQuery });
    } else if (model.modelName === "User") {
      // if we are finding doctors, first we need to find the hospitals by location and use these hospitals to filter
      // doctors
      const hospitals = await Hospital.find(locQuery);
      query = model.find({
        role: "doctor",
        hospital: { $in: hospitals },
        ...JSON.parse(queryStr),
      });
    }
  }
  else {
    // we want to be able to fetch data that is related to doctors and patients
    // Ex: doctors want to get their search, users want
    // to get their prescriptions
    if (req.user) {
      query = model.find({[req.user.role]: [req.user.id], ...JSON.parse(queryStr)})
    } else {
      query = model.find(JSON.parse(queryStr));
    }
  }

  // query with mongoose

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Pagination

  // page 1 by default
  const page = parseInt(req.query.page, 10) || 1;
  // limit results to 10 per page by default
  const limit = parseInt(req.query.limit, 10) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments(JSON.parse(queryStr));

  query = query.skip(startIndex).limit(limit);

  // if (populate) {
  //   query = query.populate(populate);
  // }
  if (populate.length >= 1) {
    populate.map((modelToPopulate) => {
      query = query.populate(modelToPopulate)
    })
  }

  // Executing query
  const results = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.filterResults = {
    success: true,
    count: total,
    pagination,
    data: results,
  };

  next();
};

module.exports = filterResults;
