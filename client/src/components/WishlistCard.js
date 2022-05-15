import React from 'react';
import Rater from 'react-rater';

export const WishlistCard = ({ book, onDelete }) => {
  const { bookId, isWishlist, thumbnail, title, authors, rating } = book;

  if(!isWishlist) {
    return null
  }
  
  return (
    <div className='column is-3-desktop is-6-tablet is-12-mobile'>
      <div className="card">
        <div className="card-image">
          <figure >
            <img style={{ width: '100%', maxHeight: '233px', objectFit: 'contain'}} src={thumbnail} alt="Books Image" />
          </figure>
        </div>
        <div className="card-content is-flex is-flex-direction-column">
          <p className='has-text-black has-text-weight-bold'>{title}</p>
          {
            authors ? authors.join(', ') : <p>Unknown Author</p>
          }
          {
            rating ? (
              <section className='is-flex is-flex-direction-row'>
                <Rater total={5} rating={rating} interactive={false} />
              </section>
            ) : <p className='has-text-weight-light is-size-7'>Tidak ada rating</p>
          }
          <button onClick={() => onDelete(bookId)} className='button mt-3 is-align-self-end is-danger'>
            Hapus dari wishlist
          </button>
        </div>
      </div>
    </div>
  )
}