import { useCart } from '../context/CartContext';
import CartCard from '../components/CartCard/CartCard';
import style from './Cart.module.css';
import { useEffect } from 'react';

export default function Cart() {
  const { itemsInCart, removeFromCart, updateQuantity } = useCart();

  function handleQuantityChange(id, newQuantity) {
    console.log('handleQuantityChange firing for id: ', id);
    updateQuantity(id, newQuantity);
  }

  function countItems(items) {
    let count = 0;
    items.forEach((item) => {
      count += item.quantity;
    });

    return count;
  }

  useEffect(() => {
    console.log('Items in Cart:', itemsInCart);
  }, [itemsInCart]);

  return (
    <div className={style.cart__container}>
      <div className={style.cart__heading__container}>
        <h2>Your Cart</h2>
        <p data-testid="cart__message">
          You have {countItems(itemsInCart)} items in your cart
        </p>
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
