const NodeGeocoder = require("node-geocoder");

// Based on:
// https://github.com/nchaulet/node-geocoder
const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: "https",
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;