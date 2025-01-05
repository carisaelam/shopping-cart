import style from './Navbar.module.css';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ itemsInCart }) {
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
              {itemsInCart > 0 && (
                <span className={style.items__in__cart}>
                  {itemsInCart > 0 ? '[' + itemsInCart + ']' : ''}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
