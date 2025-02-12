import ProductCard from '../components/ProductCard/ProductCard';
import style from './Home.module.css';
import { useCart } from '../context/CartContext';
import { useProducts } from '../App';

export default function Home() {
  const { addToCart, itemsInCart, removeFromCart } = useCart();
  const products = useProducts();

  return (
    <div className={style.home__container}>
      <h2>Welcome</h2>
      <div
        data-testid="product__card__container"
        className={style.product__card__container}
      >
        {products &&
          products.map((product) => {
            const isInCart = itemsInCart.some((item) => item.id === product.id);
            const cartItem = itemsInCart.find((item) => item.id === product.id);
            const quantity = cartItem ? cartItem.quantity : 1;
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                image={{ url: product.image, alt: `${product.title} image` }}
                title={product.title}
                price={product.price.toFixed(2)}
                description={product.description}
                category={product.category}
                quantity={quantity}
                isInCart={isInCart}
                onButtonClick={isInCart ? removeFromCart : addToCart}
              />
            );
          })}
      </div>
    </div>
  );
}
