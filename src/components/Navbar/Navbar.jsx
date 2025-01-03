import style from './Navbar.module.css';
import { Link } from 'react-router-dom';

export default function Navbar({ onClick }) {
  console.log('✅ Navbar rendered');
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
              className={style.navbar__links__button}
              onClick={onClick}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className={style.navbar__links__button}
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
