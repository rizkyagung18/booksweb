const mongoose = require('mongoose');
const WishlistModel = require('../models/wishlist');

const getWishlist = async (req, res) => {
  try {
    const data = await WishlistModel.find();

    res.status(200).json({ status: "success", status_code: 200, data})
  } catch (error) {
    res.status(404).json({ status: "error", status_code: 404, message: error.message })
  }
}

const addWishlist = async (req, res) => {
  const { bookId, thumbnail, authors, title, rating } = req.body;

  const addedWishlist = { bookId, isWishlist: true, thumbnail, authors, title, rating: rating || null }

  const isExist = await WishlistModel.findOne({ bookId: bookId });

  if(isExist) {
    if(isExist.isWishlist) {
      return res.status(400).json({ status: "error", status_code: 400, message: "Item sudah ada di wishlist"})
    }
    await WishlistModel.findByIdAndUpdate(isExist.id, addedWishlist, { new: true })

    res.status(201).json({ status: "success", status_code: 201, data: addedWishlist})

  } else {
    let newWishlist = new WishlistModel(addedWishlist);
    try {
      await newWishlist.save();

      res.status(201).json({ status: "success", status_code: 201, data: newWishlist})
    } catch (error) {
      res.status(409).json({ status: "error", status_code: 409, message: error.message })
    }
  }
}

const deleteWishlist = async (req, res) => {
  const { id } = req.params;
  const findWishlist = await WishlistModel.findOne({ bookId: id });

  if(!findWishlist) {
    return res.status(404).json({ status: "error", status_code: 404, message: 'Data tidak ditemukan'})
  }

  const removeWishlist = { ...findWishlist._doc, isWishlist: false };

  try {
    await WishlistModel.findByIdAndUpdate(findWishlist.id, removeWishlist, { new: true });

    res.status(201).json({ status: "success", status_code: 201, data: removeWishlist})
  } catch (error) {
    res.status(409).json({ status: "error", status_code: 409, message: error.message })
  }
}

module.exports = {
  getWishlist,
  addWishlist,
  deleteWishlist
}