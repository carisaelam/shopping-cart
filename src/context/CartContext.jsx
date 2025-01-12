import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [itemsInCart, setItemsInCart] = useState([]);

  function addToCart(product) {
    setItemsInCart((prevItems) => [...prevItems, product]);
  }

  function updateQuantity(id, quantity) {
    setItemsInCart((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: quantity };
        }
        return item;
      });

      return updatedItems;
    });
  }

  function removeFromCart(product) {
    setItemsInCart((prevItems) =>
      prevItems.filter((item) => item.id !== product.id)
    );
  }

  function countItems(items) {
    let count = 0;
    items.forEach((item) => {
      count += item.quantity;
    });

    return count;
  }

  return (
    <CartContext.Provider
      value={{
        itemsInCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        countItems,
      }}
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
