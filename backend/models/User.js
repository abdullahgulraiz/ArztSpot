const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const isDoctor = function () {
  return this.role === "doctor";
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
  experience: {
    type: String,
    validate: [isDoctor, "Only Doctors can have field `experience`"],
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
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

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};
module.exports = mongoose.model("User", UserSchema);
