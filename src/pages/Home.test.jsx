import { it, describe, expect, vi, beforeEach } from 'vitest';
import Home from './Home';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { CartProvider, useCart } from '../context/CartContext';
import { useProducts } from '../App';

vi.mock('../App', () => ({
  useProducts: vi.fn(),
}));

vi.mock('../context/CartContext', () => ({
  useCart: vi.fn(),
  // eslint-disable-next-line react/prop-types
  CartProvider: ({ children }) => <div>{children}</div>,
}));

describe('Home Page', () => {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: (
          <CartProvider>
            <Home />
          </CartProvider>
        ),
      },
    ],
    { initialEntries: ['/'] }
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the Home Page', () => {
    useCart.mockReturnValue({
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      itemsInCart: [
        { id: 1, title: 'Product 1', price: 10 },
        { id: 2, title: 'Product 2', price: 20 },
      ],
    });

    render(<RouterProvider router={router} />);

    const homeText = screen.getByRole('heading', { name: /welcome/i });
    expect(homeText).toBeInTheDocument();
  });

  it('should render the product cards', () => {
    useCart.mockReturnValue({
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      itemsInCart: [
        { id: 1, title: 'Product 1', price: 10 },
        { id: 2, title: 'Product 2', price: 20 },
      ],
    });

    render(<RouterProvider router={router} />);

    const productCardContainer = screen.getByTestId('product__card__container');

    expect(productCardContainer).toBeInTheDocument();
  });

  it('should render correct number of ProductCard components', () => {
    const mockProducts = [
      {
        id: 1,
        title: 'Product 1',
        price: 10,
        image: 'url1',
        description: 'desc1',
        category: 'cat1',
      },
      {
        id: 2,
        title: 'Product 2',
        price: 20,
        image: 'url2',
        description: 'desc2',
        category: 'cat2',
      },
    ];
    useProducts.mockReturnValue(mockProducts);
    useCart.mockReturnValue({
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      itemsInCart: [],
    });

    render(<RouterProvider router={router} />);
    const productCards = screen.getAllByTestId('product__title');
    expect(productCards).toHaveLength(2);
  });
});
