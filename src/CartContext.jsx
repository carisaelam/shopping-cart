import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [itemsInCart, setItemsInCart] = useState([]);

  function addToCart(product) {
    setItemsInCart((prevItems) => [...prevItems, product]);
  }

  return (
    <CartContext.Provider value={{ itemsInCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
