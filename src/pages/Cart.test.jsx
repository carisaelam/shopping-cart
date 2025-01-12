import { it, describe, expect, vi } from 'vitest';
import Cart from './Cart';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { CartProvider, useCart } from '../context/CartContext';
import userEvent from '@testing-library/user-event';

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
      updateQuantity: vi.fn(),
      countItems: vi.fn(),
      itemsInCart: [
        { id: 1, title: 'Product 1', price: 10, quantity: 1 },
        { id: 2, title: 'Product 2', price: 20, quantity: 1 },
      ],
    });

    render(<RouterProvider router={router} />);

    const cartText = screen.getByRole('heading', { name: /your cart/i });
    expect(cartText).toBeInTheDocument();
  });

  it('should correctly show number of items in cart', () => {
    const mockCountItems = vi.fn().mockReturnValue(2);
    useCart.mockReturnValue({
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      countItems: mockCountItems,
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
    const mockCountItems = vi.fn().mockReturnValue(0);

    useCart.mockReturnValue({
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      countItems: mockCountItems,
      itemsInCart: [],
    });

    render(<RouterProvider router={router} />);

    const cartMessage = screen.getByTestId('cart__message');
    expect(cartMessage).toHaveTextContent(/0/i);
  });

  it('should render correct number of CartCard components', () => {
    useCart.mockReturnValue({
      itemsInCart: [
        { id: 1, title: 'Product 1', price: 10, quantity: 1 },
        { id: 2, title: 'Product 2', price: 20, quantity: 2 },
      ],
      countItems: vi.fn().mockReturnValue(2),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
    });

    render(<RouterProvider router={router} />);
    const cartCards = screen.getAllByTestId('product__title');
    expect(cartCards).toHaveLength(2);
  });

  it('should call removeFromCart when remove button is clicked', async () => {
    const mockRemoveFromCart = vi.fn();
    const user = userEvent.setup();

    useCart.mockReturnValue({
      itemsInCart: [{ id: 1, title: 'Product 1', price: 10, quantity: 1 }],
      countItems: vi.fn().mockReturnValue(1),
      removeFromCart: mockRemoveFromCart,
      updateQuantity: vi.fn(),
    });

    render(<RouterProvider router={router} />);
    const removeButton = screen.getByTestId('product__remove__from__cart');

    await user.click(removeButton);

    expect(mockRemoveFromCart).toHaveBeenCalled();
  });

  it('should call updateQuantity when quantity is changed', async () => {
    const mockUpdateQuantity = vi.fn();
    const user = userEvent.setup();

    useCart.mockReturnValue({
      itemsInCart: [{ id: 1, title: 'Product 1', price: 10, quantity: 1 }],
      countItems: vi.fn().mockReturnValue(1),
      removeFromCart: vi.fn(),
      updateQuantity: mockUpdateQuantity,
    });

    render(<RouterProvider router={router} />);
    const quantityInput = screen.getByTestId('product__quantity');

    await user.clear(quantityInput);
    await user.type(quantityInput, '2');

    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 2);
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
      /you have 0 items in your cart/i
    );
  });

  it('should render total cost of cart', () => {
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
    const cartTotal = screen.getByTestId('cart__total');
    expect(cartTotal).toHaveTextContent(/30/i);
  });
});
