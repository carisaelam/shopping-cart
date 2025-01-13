import { useCart } from '../context/CartContext';
import CartCard from '../components/CartCard/CartCard';
import CartCalculations from '../components/CartCalculations/CartCalculations';
import style from './Cart.module.css';

export default function Cart() {
  const { itemsInCart, removeFromCart, updateQuantity } = useCart();

  function handleQuantityChange(id, newQuantity) {
    updateQuantity(id, newQuantity);
  }

  return (
    <>
      <div className={style.cart__container}>
        <div className={style.cart__heading__container}>
          <h2>Your Cart</h2>
        </div>
        <div className={style.cart__contents__container}>
          {itemsInCart.map((item) => {
            return (
              <CartCard
                key={item.id}
                {...item}
                onButtonClick={removeFromCart}
                onQuantityChange={handleQuantityChange}
              />
            );
          })}
        </div>
      </div>
      <div>
        <CartCalculations />
      </div>
    </>
  );
}
