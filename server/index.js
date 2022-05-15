const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const wishlistRoutes = require('./routes/wishlist')

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 80;

mongoose.connect(process.env.MONGO_URI);

app.use('/wishlist', wishlistRoutes);

app.listen(PORT, () => {
  console.log("Server running on port " + PORT)
});