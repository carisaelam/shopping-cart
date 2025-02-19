import style from './Navbar.module.css';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const location = useLocation();
  const { itemsInCart = [], countItems } = useCart() || {};

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
              className={`${style.home__button} ${location.pathname === '/' ? style.active : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className={`${style.cart__button} ${location.pathname === '/cart' ? style.active : ''}`}
            >
              Cart
              {countItems(itemsInCart) > 0 && (
                <span className={style.items__in__cart}>
                  {itemsInCart ? '[' + countItems(itemsInCart) + ']' : ''}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  itemsInCart: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
