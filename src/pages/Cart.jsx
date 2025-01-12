import { useCart } from '../context/CartContext';
import CartCard from '../components/CartCard/CartCard';
import style from './Cart.module.css';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

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
    console.log('calculating cartTotal', items);
    let total = 0;
    items.map((item) => {
      let subtotal = item.price * item.quantity;
      total += subtotal;
    });

    return total;
  }

  return (
    <div className={style.cart__container}>
      <div className={style.cart__heading__container}>
        <h2>Your Cart</h2>
        <p data-testid="cart__message">
          You have {countItems(itemsInCart)} items in your cart
        </p>
        <p data-testid="cart__total">${cartTotal}</p>
      </div>
      <div>
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
  );
}
