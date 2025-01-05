import style from './App.module.css';
import Navbar from './components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { CartProvider } from './CartContext';

function App() {
  return (
    <CartProvider>
      <div className={style.app__container}>
        <Navbar />
        <Outlet />
      </div>
    </CartProvider>
  );
}

export default App;
