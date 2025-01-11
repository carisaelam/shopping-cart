import { it, describe, expect, vi, beforeEach } from 'vitest';
import Cart from './Cart';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { CartProvider, useCart } from '../context/CartContext';

vi.mock('../context/CartContext', () => ({
  useCart: vi.fn(),
  // eslint-disable-next-line react/prop-types
  CartProvider: ({ children }) => <div>{children}</div>,
}));

describe('Cart Page', () => {
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

  it('should render the Cart Page', () => {
    useCart.mockReturnValue({
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      itemsInCart: [
        { id: 1, title: 'Product 1', price: 10 },
        { id: 2, title: 'Product 2', price: 20 },
      ],
    });

    render(<RouterProvider router={router} />);

    const cartText = screen.getByRole('heading', { name: /your cart/i });
    expect(cartText).toBeInTheDocument();
  });

  it('should correctly show number of items in cart', () => {
    useCart.mockReturnValue({
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      itemsInCart: [
        { id: 1, title: 'Product 1', price: 10, quantity: 1 },
        { id: 2, title: 'Product 2', price: 20, quantity: 1 },
      ],
    });

    render(<RouterProvider router={router} />);

    const cartMessage = screen.getByTestId('cart__message');
    expect(cartMessage).toHaveTextContent(/2/i);
  });

  it('should show message when cart is empty', () => {
    useCart.mockReturnValue({
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      itemsInCart: [],
    });

    render(<RouterProvider router={router} />);

    const cartMessage = screen.getByTestId('cart__message');
    expect(cartMessage).toHaveTextContent(/0/i);
  });
});
