const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
  bookId: String,
  isWishlist: Boolean,
  thumbnail: String,
  authors: [String],
  title: String,
  rating: Number
})

var Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist