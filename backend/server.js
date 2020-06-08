const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require('morgan');

// Load config file
dotenv.config({ path: "./config/.env" });

// Connect database
connectDB();

const app = express();

// logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Arztspot ${process.env.NODE_ENV} server running in port ${PORT}`)
);

// Handle undhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
