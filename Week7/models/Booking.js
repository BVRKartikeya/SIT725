const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: String,
    hotel: String,
    response: String
});

module.exports = mongoose.model('Booking', bookingSchema);
