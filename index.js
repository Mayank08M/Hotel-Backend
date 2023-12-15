const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
app.use(cors());

const url = 'mongodb://localhost:27017/hotelbooking';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

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

app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/hotels', async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json(hotels);
    } catch (error) {
        console.error('Error fetching hotels:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/hotels/:hotelId', async (req, res) => {
    const hotelId = req.params.hotelId;
    console.log(hotelId, "hotelid") // Extract hotelId from the request parameters

    try {
        // Find the hotel by its ID in the 'hotels' collection
        const hotel = await Hotel.findById(hotelId);

        if (!hotel) {
            return res.status(404).send('Hotel not found'); // If hotel not found, send a 404 response
        }

        res.json(hotel); // Send the retrieved hotel data as a JSON response
    } catch (error) {
        console.error('Error fetching hotel:', error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
