const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require('cookie-parser');
const errorHandler = require("./middleware/error");
const morgan = require('morgan');

// Load config file
dotenv.config({ path: "./config/.env" });

// Connect database
connectDB();

// Route files
const auth = require("./routes/auth");
const hospitals = require("./routes/hospitals");
const doctors = require("./routes/doctors");
<<<<<<< HEAD
<<<<<<< HEAD
const appointments = require("./routes/appointments");
=======
const insurance = require("./routes/insurance");
=======
const insurances = require("./routes/insurance");
>>>>>>> f040967... Question routes successfully created.
const appointments = require('./routes/appointment');
const questions = require('./routes/question');
//const prescriptions = require('./routes/prescription');
>>>>>>> 0af1326... Question and Questionnaire models..

const app = express();


// Built-in express middleware to parse
// incoming requests with JSON
app.use(express.json());

// logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Cookie parser middleware
app.use(cookieParser());

// Mount routers
app.use("/api/v1/auth", auth);
app.use("/api/v1/hospitals", hospitals);
app.use("/api/v1/doctors", doctors);
<<<<<<< HEAD
<<<<<<< HEAD
app.use("/api/v1/appointments", appointments);
=======
app.use("/api/v1/insurances", insuranceRouter);
=======
app.use("/api/v1/insurances", insurances);
app.use("/api/v1/questions", questions);
>>>>>>> f040967... Question routes successfully created.
// app.use('/api/v1/appointments', appointments);
// app.use('/api/v1/prescriptions', prescriptions);
>>>>>>> 0af1326... Question and Questionnaire models..

// Error handler middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Arztspot ${process.env.NODE_ENV} server running in port ${PORT}`)
);

// Handle undhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit if error
  server.close(() => process.exit(1));
});
