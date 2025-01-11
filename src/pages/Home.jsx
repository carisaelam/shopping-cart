import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import style from './Home.module.css';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { addToCart, removeFromCart, itemsInCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    }

    fetchData();
  }, []);

  return (
    <div className={style.home__container}>
      {products.length === 0 ? <h2>Loading...</h2> : <h2>Welcome</h2>}
      <div
        data-testid="product__card__container"
        className={style.product__card__container}
      >
        {products &&
          products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                image={{ url: product.image, alt: `${product.title} img` }}
                title={product.title}
                price={product.price}
                description={product.description}
                category={product.category}
                isInCart={itemsInCart.some((item) => item.id === product.id)}
                onButtonClick={
                  itemsInCart.some((item) => item.id === product.id)
                    ? removeFromCart
                    : addToCart
                }
              />
            );
          })}
      </div>
    </div>
  );
}
