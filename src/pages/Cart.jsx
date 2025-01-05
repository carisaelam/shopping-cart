import { useCart } from '../CartContext';
import CartCard from '../components/CartCard/CartCard';

export default function Cart() {
  const { itemsInCart, removeFromCart } = useCart();

  console.log('itemsInCart', itemsInCart);

  return (
    <div>
      <h1>Your Cart</h1>
      <p>You have {itemsInCart.length} items in your cart</p>
      <div>
        {itemsInCart.map((item) => {
          return (
            <CartCard key={item.id} {...item} onAddToCart={removeFromCart} />
          );
        })}
      </div>
    </div>
  );
}
