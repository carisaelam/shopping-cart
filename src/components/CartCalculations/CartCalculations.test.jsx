/* eslint-disable react/prop-types */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CartProvider } from '../../context/CartContext';
import { createMemoryRouter } from 'react-router-dom';
import Cart from '../../pages/Cart';

import CartCalculations from '../CartCalculations/CartCalculations';

vi.mock('../../context/CartContext', () => ({
  useCart: vi.fn(() => ({
    itemsInCart: [],
    removeFromCart: vi.fn(),
    updateQuantity: vi.fn(),
    countItems: vi.fn(() => 0),
  })),
  CartProvider: ({ children }) => <div>{children}</div>,
}));

describe('Cart Calculations component', () => {
  const router = createMemoryRouter(
    [
      {
        path: '/cart',
        element: (
          <CartProvider>
            <Cart />
          </CartProvider>
        ),
      },
    ],
    { initialEntries: ['/cart'] }
  );
  // Rendering
  it('should render a cart calculations component card', () => {
    render(<CartCalculations />);
    expect(screen.getByTestId('cart__calculations')).toBeInTheDocument();
  });

  it('should display appropriate message when cart is empty', () => {
    useCart.mockReturnValue({
      itemsInCart: [],
      countItems: vi.fn().mockReturnValue(0),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
    });

    render(<RouterProvider router={router} />);
    expect(screen.getByTestId('cart__message')).toHaveTextContent(
      /you have 0 item/i
    );
  });

  it('should render cost of items in cart', () => {
    useCart.mockReturnValue({
      itemsInCart: [
        { id: 1, title: 'Product 1', price: 10, quantity: 1 },
        { id: 2, title: 'Product 2', price: 20, quantity: 1 },
      ],
      countItems: vi.fn().mockReturnValue(2),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
    });

    render(<RouterProvider router={router} />);
    const itemsTotal = screen.getByTestId('items__total');
    expect(itemsTotal).toHaveTextContent(/30/i);
  });

  it('should render the tax cost', () => {
    useCart.mockReturnValue({
      itemsInCart: [
        { id: 1, title: 'Product 1', price: 10, quantity: 1 },
        { id: 2, title: 'Product 2', price: 20, quantity: 1 },
      ],
      countItems: vi.fn().mockReturnValue(2),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
    });

    render(<RouterProvider router={router} />);
    const tax = screen.getByTestId('tax');
    expect(tax).toHaveTextContent(/2.1/i);
  });

  it('should render the shipping and handling cost', () => {
    useCart.mockReturnValue({
      itemsInCart: [
        { id: 1, title: 'Product 1', price: 10, quantity: 1 },
        { id: 2, title: 'Product 2', price: 20, quantity: 1 },
      ],
      countItems: vi.fn().mockReturnValue(2),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
    });

    render(<RouterProvider router={router} />);
    const shippingAndHandling = screen.getByTestId('shipping__and__handling');
    expect(shippingAndHandling).toHaveTextContent(/0.9/i);
  });

  it('should render the total cost', () => {
    useCart.mockReturnValue({
      itemsInCart: [
        { id: 1, title: 'Product 1', price: 10, quantity: 1 },
        { id: 2, title: 'Product 2', price: 20, quantity: 1 },
      ],
      countItems: vi.fn().mockReturnValue(2),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
    });

    render(<RouterProvider router={router} />);
    const grandTotal = screen.getByTestId('grand__total');
    expect(grandTotal).toHaveTextContent(/33/i);
  });
});
