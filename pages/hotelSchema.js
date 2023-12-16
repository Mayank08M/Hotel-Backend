
const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    id: Number,
    name: String,
    location: String,
    city: String,
    image: String,
    tag1: String,
    tag2: String,
    tag3: String,
    price: Number
});

const Hotel = mongoose.model('Hotel', hotelSchema);
module.exports = Hotel; 