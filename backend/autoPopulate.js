// Populate db with dummy data in JSON

const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load .env vars
dotenv.config({ path: "./config/.env" });

// Load models
const Hospital = require("./models/Hospital");
const User = require("./models/User");

// Connect to DB
mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Read JSON files

const hospitals = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/hospitals.json`, "utf-8")
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);
// Import into DB
const importData = async () => {
  try {
    await Hospital.create(hospitals);
    await User.create(users);

    console.log("Data Imported...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Hospital.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
