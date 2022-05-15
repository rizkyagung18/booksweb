import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <nav class="navbar is-danger" role="navigation" aria-label="main navigation">
      <div className='container is-widescreen'>
        <div class="navbar-brand">
          <a className='has-text-weight-bold has-text-white is-size-3 mr-5' href="#">
            Books Store
          </a>

          <a onClick={() => setNavOpen((nav) => !nav)} role="button" class={`navbar-burger${navOpen ? ' is-active' : ''}`} data-target="nav-link">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div id="nav-link" class={`navbar-menu${navOpen ? ' is-active' : ''}`}>
          <div class="navbar-start">
            <Link to="/" class="navbar-item">
              Home
            </Link>

            <Link to="/wishlist" class="navbar-item">
              Wishlist
            </Link>
          </div>
        </div>        
      </div>
    </nav>
  )
}