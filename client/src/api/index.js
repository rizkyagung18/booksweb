import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:80'
})

export const getWishlist = async () => await api.get('/wishlist')

export const addWishlist = async (data) => await api.post('/wishlist/add', data)

export const deleteWishlist = async (id) => await api.delete('/wishlist/delete/' + id)