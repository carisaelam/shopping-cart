import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard/ProductCard';

export default function Home() {
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
    <div>
      <h1>Welcome</h1>
      <div>
        <p>Product cards go here</p>
        {products &&
          products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                image={{ url: product.image, alt: `${product.title} img` }}
                title={product.title}
                price={product.price}
                description={product.description}
                category={product.category}
              />
            );
          })}
      </div>
    </div>
  );
}
