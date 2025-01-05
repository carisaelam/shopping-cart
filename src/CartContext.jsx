import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [itemsInCart, setItemsInCart] = useState([]);

  function addToCart(product) {
    setItemsInCart((prevItems) => [...prevItems, product]);
  }

  function removeFromCart(product) {
    setItemsInCart((prevItems) =>
      prevItems.filter((item) => item.id !== product.id)
    );
  }

  return (
    <CartContext.Provider value={{ itemsInCart, addToCart, removeFromCart }}>
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
