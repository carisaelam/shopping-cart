import style from './App.module.css';
import Navbar from './components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import ProductCard from './components/ProductCard/ProductCard';

function App() {
  console.log('App rendered');
  return (
    <div className={style.app__container}>
      <Navbar />
      <Outlet />
      <ProductCard />
    </div>
  );
}

export default App;
