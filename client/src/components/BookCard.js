import React, { useState } from 'react';
import Rater from 'react-rater';
import { toast } from 'react-toastify';
import { addWishlist } from '../api';
import Swal from 'sweetalert2';

export const BookCard = ({ book, onWishlist }) => {
  const [loading, setLoading] = useState(false);
  const info = book.volumeInfo;

  const addToWishlist = async () => {
    const { id } = book;
    const { imageLinks, authors, averageRating, title } = info;
    const params = { bookId: id, thumbnail: imageLinks?.thumbnail, authors, rating: averageRating, title};
    setLoading(true);

    try {
      await addWishlist(params);
      Swal.fire({
        title: 'Sukses',
        text: 'Berhasil memasukkan produk ke wishlist',
        icon: 'success'
      })
      setLoading(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error?.response?.data?.message || 'Terjadi Kesalahan!',
      })
      setLoading(false)
    }
  }

  return (
    <div className='column is-3-desktop is-6-tablet is-12-mobile'>
      <div className="card">
        <div className="card-image">
          <figure >
            <img style={{ width: '100%', maxHeight: '233px', objectFit: 'contain'}} src={info?.imageLinks?.thumbnail} alt="Books Image" />
          </figure>
        </div>
        <div className="card-content is-flex is-flex-direction-column">
          <p className='has-text-black has-text-weight-bold'>{info.title}</p>
          {
            info?.authors ? info.authors.join(', ') : <p>Unknown Author</p>
          }
          {
            info.averageRating ? (
              <section className='is-flex is-flex-direction-row'>
                <Rater total={5} rating={info.averageRating} interactive={false} />
                <p>({info.ratingsCount})</p>
              </section>
            ) : <p className='has-text-weight-light is-size-7'>Tidak ada rating</p>
          }
          <button onClick={addToWishlist} className={`button mt-3 is-align-self-end is-danger${loading ? ' is-loading' : ''}`}>
            Tambahkan ke wishlist
          </button>
        </div>
      </div>
    </div>
  )
}