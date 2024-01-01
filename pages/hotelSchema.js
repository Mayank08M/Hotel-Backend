
const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    location: String,
    city: String,
    image: String,
    tags: [String], // Array of strings for tags
    facilities: {
      AC: String,
      TV: String,
      bed: String
      // Add more facilities as needed
    },
    prices: {
      finalPrice: Number,
      basePrice: Number,
      perNight: Number,
      serviceCharge: Number,
      cleaningCharge: Number
    },
    occupancy: {
      person: String
      // Add more occupancy details as needed
    }
  });

const Hotel = mongoose.model('Hotel', hotelSchema);
module.exports = Hotel; 