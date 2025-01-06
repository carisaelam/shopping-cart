import { useCart } from '../context/CartContext';
import CartCard from '../components/CartCard/CartCard';
import style from './Cart.module.css';

export default function Cart() {
  const { itemsInCart, removeFromCart } = useCart();

  return (
    <div className={style.cart__container}>
      <div className={style.cart__heading__container}>
        <h2>Your Cart</h2>
        <p data-testid="cart__message">
          You have {itemsInCart.length} items in your cart
        </p>
      </div>
      <div>
        {itemsInCart.map((item) => {
          return (
            <CartCard key={item.id} {...item} onButtonClick={removeFromCart} />
          );
        })}
      </div>
    </div>
  );
}
