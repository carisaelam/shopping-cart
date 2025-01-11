import style from './App.module.css';
import Navbar from './components/Navbar/Navbar';
import { Outlet, useOutletContext } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { useState, useEffect, createContext, useContext } from 'react';

export const ProductContext = createContext();

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products: ', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <CartProvider>
      <ProductContext.Provider value={products}>
        <div className={style.app__container}>
          <Navbar />
          <Outlet />
        </div>
      </ProductContext.Provider>
    </CartProvider>
  );
}

export default App;
export const useProducts = () => useContext(ProductContext);
