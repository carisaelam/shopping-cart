import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [itemsInCart, setItemsInCart] = useState([]);

  function addToCart(product) {
    setItemsInCart((prevItems) => [...prevItems, product]);
  }

  function updateQuantity(id, quantity) {
    console.log(
      'updating quantity for product id: ',
      id,
      'New qty: ',
      quantity
    );

    setItemsInCart((prevItems) => {
      console.log('calling setItems from updateQuantity: prevItems', prevItems);

      const updatedItems = prevItems.map((item) => {
        if (item.id === id) {
          console.log('updating item: ', item);
          return { ...item, quantity: quantity };
        }
        return item;
      });

      console.log('updatedItems', updatedItems);

      return updatedItems;
    });
  }

  function removeFromCart(product) {
    setItemsInCart((prevItems) =>
      prevItems.filter((item) => item.id !== product.id)
    );
  }

  return (
    <CartContext.Provider
      value={{ itemsInCart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

CartProvider.propTypes = {
  children: PropTypes.any,
};
