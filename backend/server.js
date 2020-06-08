const express = require("express");
const dotenv = require("dotenv");

// Load config file
dotenv.config({ path: "./config/.env" });

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Arztspot ${process.env.NODE_ENV} server running in port ${PORT}`)
);
