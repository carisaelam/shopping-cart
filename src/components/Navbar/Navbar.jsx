import style from './Navbar.module.css';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ itemNumber }) {
  const location = useLocation();

  return (
    <nav data-testid="navbar" className={style.navbar__container}>
      <div className={style.navbar__store}>
        <h1>Store</h1>
      </div>
      <div className={style.navbar__links__container}>
        <ul>
          <li>
            <Link
              to="/"
              className={`${style.navbar__links__button} ${location.pathname === '/' ? style.active : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className={`${style.navbar__links__button} ${location.pathname === '/cart' ? style.active : ''}`}
            >
              Cart
              {itemNumber > 0 && (
                <span className={style.item__number}>
                  {itemNumber > 0 ? '[' + itemNumber + ']' : ''}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
