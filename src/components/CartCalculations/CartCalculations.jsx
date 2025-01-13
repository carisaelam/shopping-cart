import style from './CartCalculations.module.css';

import { useState, useEffect } from 'react';

import { useCart } from '../../context/CartContext';

export default function CartCalculations() {
  const { itemsInCart, countItems } = useCart();

  const [cartTotal, setCartTotal] = useState(0);

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
    <div data-testid="cart__calculations" className={style.cart__calculations}>
      Cart Calculations Area
      <p data-testid="cart__message">
        You have {countItems(itemsInCart)} item(s) in your cart
      </p>
      <p data-testid="cart__total">${cartTotal}</p>
    </div>
  );
}
