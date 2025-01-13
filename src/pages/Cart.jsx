import { useCart } from '../context/CartContext';
import CartCard from '../components/CartCard/CartCard';
import CartCalculations from '../components/CartCalculations/CartCalculations';
import style from './Cart.module.css';
import { useState, useEffect } from 'react';

export default function Cart() {
  const { itemsInCart, removeFromCart, updateQuantity, countItems } = useCart();

  const [cartTotal, setCartTotal] = useState(0);

  function handleQuantityChange(id, newQuantity) {
    updateQuantity(id, newQuantity);
  }

  useEffect(() => {
    setCartTotal(calculateCartTotal(itemsInCart));
  }, [itemsInCart]);

  function calculateCartTotal(items) {
    let total = 0;
    items.map((item) => {
      let subtotal = item.price * item.quantity;
      total += subtotal;
    });

    return total.toFixed(2);
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
