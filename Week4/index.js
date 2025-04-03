const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/hotelBookings', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


const bookingSchema = new mongoose.Schema({
    name: String,
    hotel: String,
    response: String 
});

const Booking = mongoose.model('Booking', bookingSchema);


app.post('/book', async (req, res) => {
    try {
        const { name, hotel, response } = req.body;
        if (!name || !hotel || !response) {
            return res.status(400).json({ message: "Name, hotel, and response are required" });
        }

        const newBooking = new Booking({ name, hotel, response });
        await newBooking.save();
        res.status(201).json({ message: "Booking and response saved successfully", data: newBooking });
    } catch (error) {
        res.status(500).json({ message: "Error saving booking and response", error });
    }
});


app.get('/responses', async (req, res) => {
    try {
        const responses = await Booking.find({}, 'name hotel response'); 
        res.status(200).json(responses);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving responses", error });
    }
});


const PORT = process.env.PORT || 3000;
console.log(`App is running at :localhost:${PORT}/`);
