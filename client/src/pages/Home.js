import React, { useState, useEffect, useRef} from 'react';
import axios from 'axios';
import _ from 'lodash';
import { BookCard } from '../components';
import { addWishlist } from '../api';
import { ToastContainer } from 'react-toastify';

const Home = () => {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current = _.debounce(onSearch, 300)
  }, [])

  const onSearch = (search) => {
    setLoading(true)
    axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${search || 'World'}&maxResults=20`)
    .then((res) => {
      setBooks(res.data.items);
      setError('');
      setLoading(false)
    })
    .catch((err) => {
      setError(err.response.data.message)
      setLoading(false)
    })
  }

  const handleInputChange = (event) => {
    const input = event.target.value;
    setSearch(input);
    inputRef.current(input);
  };

  return (
    <>
      <div className='control is-flex is-flex-grow-1 is-flex-direction-row is-align-items-center mt-2'>
        <input id="search" value={search} onChange={handleInputChange} className='input' type="search" placeholder='Search Books' />
      </div>
      {books.length > 0 && (
        <div className='columns is-variable is-6 is-multiline pt-6'>
          {books.map((book, index) => {
            return (
              <BookCard
                book={book}
                key={index}
              />
            )
          })}
        </div>
      )}
      {loading && <p>Loading...</p>}
      {!books.length && !loading && (
        <div className='is-flex is-flex-direction-column is-align-items-center is-justify-content-center'>
          <p>Tidak ada buku.</p>
        </div>
      )}
      
    </>
  )
}

export default Home;