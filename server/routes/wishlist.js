const express = require('express');
const { getWishlist, addWishlist, deleteWishlist } = require('../controllers/wishlist');
const router = express.Router();

router.get('/', getWishlist)
router.post('/add', addWishlist)
router.delete('/delete/:id', deleteWishlist)

module.exports = router;