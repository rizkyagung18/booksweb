const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const wishlistRoutes = require('./routes/wishlist')

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.resolve(__dirname, "./client/build")));

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI);

app.use('/wishlist', wishlistRoutes);

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT)
});