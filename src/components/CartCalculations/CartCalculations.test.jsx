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

  // Rounding
  it('should round cost to two decimal places', () => {
    useCart.mockReturnValue({
      itemsInCart: [
        { id: 1, title: 'Product 1', price: 10.5555, quantity: 1 },
        { id: 2, title: 'Product 2', price: 20, quantity: 1 },
      ],
      countItems: vi.fn().mockReturnValue(2),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
    });

    render(<RouterProvider router={router} />);
    const itemsTotal = screen.getByTestId('items__total');
    expect(itemsTotal).toHaveTextContent(/30.56/i);
  });

  it('should round to two even with tiny prices', () => {
    useCart.mockReturnValue({
      itemsInCart: [{ id: 1, title: 'Product 1', price: 0.01, quantity: 1 }],
      countItems: vi.fn().mockReturnValue(2),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
    });

    render(<RouterProvider router={router} />);
    const itemsTotal = screen.getByTestId('items__total');
    expect(itemsTotal).toHaveTextContent(/0.01/i);
  });

  // Calculations
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

  it('should render zeroes for costs when cart is empty', () => {
    useCart.mockReturnValue({
      itemsInCart: [],
      countItems: vi.fn().mockReturnValue(0),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
    });

    render(<RouterProvider router={router} />);
    const itemsTotal = screen.getByTestId('items__total');
    const grandTotal = screen.getByTestId('grand__total');
    const tax = screen.getByTestId('tax');
    const shippingAndHandling = screen.getByTestId('shipping__and__handling');
    expect(itemsTotal).toHaveTextContent(/0/i);
    expect(grandTotal).toHaveTextContent(/0/i);
    expect(tax).toHaveTextContent(/0/i);
    expect(shippingAndHandling).toHaveTextContent(/0/i);
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

  it('should render correct cost for large quantities', () => {
    useCart.mockReturnValue({
      itemsInCart: [
        { id: 1, title: 'Product 1', price: 10, quantity: 100000000 },
        { id: 2, title: 'Product 2', price: 20, quantity: 100000000 },
      ],
      countItems: vi.fn().mockReturnValue(2),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
    });

    render(<RouterProvider router={router} />);
    const grandTotal = screen.getByTestId('grand__total');
    expect(grandTotal).toHaveTextContent(/3300000000.00/i);
  });

  // Updating costs
  it('should update total cost when item is removed', async () => {
    let mockCart = {
      itemsInCart: [
        { id: 1, title: 'Product 1', price: 10, quantity: 1 },
        { id: 2, title: 'Product 2', price: 20, quantity: 1 },
      ],
      countItems: vi.fn().mockReturnValue(2),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
    };

    const useCartMock = vi.fn(() => mockCart);
    useCart.mockImplementation(useCartMock);

    const { rerender } = render(<CartCalculations />);

    let grandTotal = screen.getByTestId('grand__total');
    expect(grandTotal).toHaveTextContent(/33.00/);

    mockCart = {
      ...mockCart,
      itemsInCart: [{ id: 1, title: 'Product 1', price: 10, quantity: 1 }],
      countItems: vi.fn().mockReturnValue(1),
    };

    useCartMock.mockReturnValue(mockCart);

    rerender(<CartCalculations />);

    grandTotal = screen.getByTestId('grand__total');
    expect(grandTotal).toHaveTextContent(/11.00/);
  });

  it('should update total cost when quantity is changed', async () => {
    let mockCart = {
      itemsInCart: [
        { id: 1, title: 'Product 1', price: 10, quantity: 1 },
        { id: 2, title: 'Product 2', price: 20, quantity: 1 },
      ],
      countItems: vi.fn().mockReturnValue(2),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
    };

    const useCartMock = vi.fn(() => mockCart);
    useCart.mockImplementation(useCartMock);

    const { rerender } = render(<CartCalculations />);

    let grandTotal = screen.getByTestId('grand__total');
    expect(grandTotal).toHaveTextContent(/33.00/);

    mockCart = {
      ...mockCart,
      itemsInCart: [
        { id: 1, title: 'Product 1', price: 10, quantity: 2 },
        { id: 2, title: 'Product 2', price: 20, quantity: 1 },
      ],
      countItems: vi.fn().mockReturnValue(1),
    };

    useCartMock.mockReturnValue(mockCart);

    rerender(<CartCalculations />);

    grandTotal = screen.getByTestId('grand__total');
    expect(grandTotal).toHaveTextContent(/44.00/);
  });
});
