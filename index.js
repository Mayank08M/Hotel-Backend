const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const Hotel = require('../hotelbooking-backend/pages/hotelSchema');
const User = require('../hotelbooking-backend/pages/userSchema');

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

app.post('/adduser', async (req, res) => {
    try {
        const { email, firstname, message, phone, surname } = req.body;
        const newUser = new User({
            email,
            firstname,
            message,
            phone,
            surname
        });
        const savedUser = await newUser.save();

        // Respond with the saved user data
        res.json(savedUser);
    } catch (error) {
        // Handle errors
        console.error('Error on submission:', error);
        res.status(500).send('Internal Server Error');
    }
});

// mysql query for userlogin api
//SELECT users.name AS user_name, users.email, core_roles.name as Role
//FROM users
//INNER JOIN core_model_has_roles ON core_model_has_roles.model_id = users.id
//INNER JOIN core_roles ON core_roles.id = core_model_has_roles.role_id where core_roles.id = 2;

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

app.get('/suggestions/:term', async (req, res) => {
    const { term } = req.params;
    try {
      const regex = new RegExp(term, 'i'); // Case-insensitive regex for partial matching
      const suggestions = await Hotel.find({
        $or: [
          { name: { $regex: regex } },
          { city: { $regex: regex } }
          // Add more fields for additional suggestions if needed
        ]
      }).limit(10);
      res.json(suggestions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
