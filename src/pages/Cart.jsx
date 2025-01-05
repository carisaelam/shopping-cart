import { useCart } from '../CartContext';

export default function Cart() {
  const { itemsInCart } = useCart();

  return (
    <div>
      <h1>Your Cart</h1>
      <p>You have {itemsInCart.length} items in your cart</p>
      <div>Cart items go here</div>
    </div>
  );
}
