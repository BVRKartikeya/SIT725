const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
    const { name, hotel, response } = req.body;
    if (!name || !hotel || !response) {
        return res.status(400).json({ message: "Name, hotel, and response are required" });
    }

    try {
        const newBooking = new Booking({ name, hotel, response });
        await newBooking.save();
        res.status(201).json({ message: "Booking saved", data: newBooking });
    } catch (error) {
        res.status(500).json({ message: "Error saving booking", error });
    }
};

exports.getResponses = async (req, res) => {
    try {
        const responses = await Booking.find({}, 'name hotel response');
        res.status(200).json(responses);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving responses", error });
    }
};
