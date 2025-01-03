import style from './Navbar.module.css';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Navbar({ onClick }) {
  console.log('✅ Navbar rendered');
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
              onClick={onClick}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className={`${style.navbar__links__button} ${location.pathname === '/cart' ? style.active : ''}`}
              onClick={onClick}
            >
              Cart
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  onClick: PropTypes.func,
};
