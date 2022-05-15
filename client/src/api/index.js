import axios from 'axios';

export const getWishlist = async () => await axios.get('/wishlist')

export const addWishlist = async (data) => await axios.post('/wishlist/add', data)

export const deleteWishlist = async (id) => await axios.delete('/wishlist/delete/' + id)