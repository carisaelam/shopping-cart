import { useCart } from '../CartContext';
import ProductCard from '../components/ProductCard/ProductCard';

export default function Cart() {
  const { itemsInCart } = useCart();

  console.log('itemsInCart', itemsInCart);

  return (
    <div>
      <h1>Your Cart</h1>
      <p>You have {itemsInCart.length} items in your cart</p>
      <div>
        {itemsInCart.map((item) => {
          return (<ProductCard {...item}/>);
        })}
      </div>
    </div>
  );
}
