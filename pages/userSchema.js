const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: String,
    surname: String,
    email: String,
    phone: Number,
    message: String
},
{ versionKey: false });

const User = mongoose.model('User', userSchema);
module.exports = User; 