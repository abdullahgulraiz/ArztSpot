const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");

const HospitalSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  address_geojson: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  phone: {
    type: String,
    match: [
      /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{3}$/,
      "Please add a valid phone number formatted as +XX (XXX) XXX-XXX",
    ],
    required: true,
  },
  is_private_practice: {
    type: Boolean,
    required: true,
  },
}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});



// Geocode address in geojson format
// useful to search doctors near certain location
// Geocode & create location field
HospitalSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.address_geojson = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    country: loc[0].countryCode,
  };
  // Do not save address in DB
  this.address = undefined;
  next();
});

// Reverse populate with virtuals
// @Doc: https://mongoosejs.com/docs/tutorials/virtuals.html (under Populate field)
HospitalSchema.virtual("doctors", {
  ref: "User",
  localField: "_id",
  foreignField: "hospital",
  justOne: false,
});


module.exports = mongoose.model("Hospital", HospitalSchema);
