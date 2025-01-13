import style from './CartCalculations.module.css';

import { useState, useEffect } from 'react';

import { useCart } from '../../context/CartContext';

export default function CartCalculations() {
  const { itemsInCart, countItems } = useCart();

  const [itemsTotal, setItemsTotal] = useState(0);

  const itemsTotalValue = itemsTotal || 0;

  const TAX = itemsTotalValue * 0.07 || 0;
  const SHIPPING__AND__HANDLING = itemsTotalValue * 0.03 || 0;
  const GRAND__TOTAL = Number(itemsTotalValue) + TAX + SHIPPING__AND__HANDLING || 0;

  useEffect(() => {
    setItemsTotal(calculateCartTotal(itemsInCart));
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
        You have {countItems(itemsInCart) || 0} item(s) in your cart
      </p>
      <div className={style.calculations__table}>
        <div data-testid="items__total" className={style.items__total}>
          <p>Subtotal: </p>
          <p>${itemsTotalValue}</p>
        </div>
        <div data-testid="tax" className={style.tax}>
          <p>Tax: </p>
          <p>${TAX.toFixed(2) || 0}</p>
        </div>
        <div
          data-testid="shipping__and__handling"
          className={style.shipping__and__handling}
        >
          <p>Shipping & Handling: </p>
          <p>${SHIPPING__AND__HANDLING.toFixed(2) || 0}</p>
        </div>
        <div data-testid="grand__total" className={style.grand__total}>
          <p>Total: </p>
          <p>${GRAND__TOTAL.toFixed(2) || 0}</p>
        </div>
      </div>
    </div>
  );
}
