import { useCart } from '../context/CartContext';
import CartCard from '../components/CartCard/CartCard';

export default function Cart() {
  const { itemsInCart, removeFromCart } = useCart();

  return (
    <div>
      <h1>Your Cart</h1>
      <p data-testid="cart__message">
        You have {itemsInCart.length} items in your cart
      </p>
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
