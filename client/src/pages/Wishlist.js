import React, { useEffect, useState } from 'react';
import { getWishlist, deleteWishlist } from '../api';
import { WishlistCard } from '../components';
import Swal from 'sweetalert2';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const getDataWishlist = () => {
    getWishlist()
    .then((response) => {
      const { data } = response.data;

      setWishlist(data)
    })
    .catch(() => {

    })
  }

  const onDelete = (id) => {
    deleteWishlist(id)
    .then((response) => {
      Swal.fire({
        title: 'Sukses',
        text: 'Berhasil menghapus produk dari wishlist',
        icon: 'success'
      })
      getDataWishlist();
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error?.response?.data?.message || 'Terjadi Kesalahan!',
      })
    })
  }

  useEffect(() => {
    getDataWishlist()
  }, [])

  console.log(wishlist)

  return (
    <div className='columns is-variable is-6 is-multiline pt-6'>
      {wishlist.map((item) => {
        return (
          <WishlistCard onDelete={onDelete} book={item} />
        )
      })}
    </div>
  )
}

export default Wishlist;