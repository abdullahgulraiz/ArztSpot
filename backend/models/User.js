const crypto = require("crypto");
const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const isDoctor = function () {
  return this.role === "doctor";
};

const isPatient = function () {
  return this.role === "user";
};

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please add first name"],
  },
  lastname: {
    type: String,
    required: [true, "Please add lastname"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  // You can only become an admin
  // by changing it directly in the db
  role: {
    type: String,
    enum: ["user", "doctor"],
    default: "user",
  },
  // select false -> Do not return by default
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // patient specific fields
  phone: {
    type: String,
    validate: [isPatient, "Only Patients can have field `phone number`"],
    match: [/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{3}$/, "Please add a valid phone number formatted as +XX (XXX) XXX-XXX"]
  },
  address: {
    type: String,
    validate: [isPatient, "Only Patients can have field `address`"],
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
  birthday: {
    type: Date,
    min: ['1900-01-01', "Shouldn't you call the Guinness Book?"],
    validate: [isPatient, "Only Patients can have field `birthday`"]
  },
  insurance_company: {
    type: String,
    enum: ["AOK", "GEK", "TK"],
    validate: [isPatient, "Only Patients can have field `insurance company` "]
  },
  insurance_number: {
    type: String,
    validate:[isPatient, "Only Patients can have field `insurance number` "]
  },
  // doctor specific fields
  experience: {
    type: String,
    validate: [isDoctor, "Only Doctors can have field `experience`"],
  }
});

// Geocode address in geojson format
// useful to search doctors near certain location
// Geocode & create location field
UserSchema.pre("save", async function (next) {
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

// Mongoose middleware
// Encrypt password in database
UserSchema.pre("save", async function (next) {
  // Higher the round the more secure but heavy
  // 10 is the recommended in the docs
  if (!this.isModified("password")) {
    next();
  }
  const round = 10;
  const salt = await bcrypt.genSalt(round);
  this.password = await bcrypt.hash(this.password, salt);
});

// Use JsonWebTokens to encode user id in protected routes
UserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

// Generate reset password token, hash it and store it temporally in db
UserSchema.methods.getResetPasswordToken = function() {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire
  this.resetPasswordExpire = Date.now() + process.env.RESET_PASSWORD_TOKEN_EXPIRE * 60 * 1000;

  return resetToken;
}
module.exports = mongoose.model("User", UserSchema);
