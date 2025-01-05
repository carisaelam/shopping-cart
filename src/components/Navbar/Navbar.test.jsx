import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import PropTypes from 'prop-types';

vi.mock('../../CartContext', () => ({
  useCart: vi.fn(),
}));

import { useCart } from '../../CartContext';

beforeEach(() => {
  vi.resetAllMocks();
  useCart.mockReturnValue({
    itemsInCart: [],
    setItemsInCart: vi.fn(),
  });
});

const TestWrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;

describe('Navbar component', () => {
  it('renders', () => {
    render(<Navbar />, { wrapper: TestWrapper });
    expect(screen.getByText('Store')).toBeInTheDocument();
  });

  it('includes a home link', () => {
    render(<Navbar />, { wrapper: TestWrapper });
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
  });

  it('includes a cart link', () => {
    render(<Navbar />, { wrapper: TestWrapper });
    const cartLink = screen.getByRole('link', { name: /cart/i });
    expect(cartLink).toBeInTheDocument();
  });

  it('should have the correct href for home link', () => {
    render(<Navbar />, { wrapper: TestWrapper });
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('should have the correct href for cart link', () => {
    render(<Navbar />, { wrapper: TestWrapper });
    const cartLink = screen.getByRole('link', { name: /cart/i });
    expect(cartLink).toHaveAttribute('href', '/cart');
  });
});

describe('Active link behavior', () => {
  it('marks home link as active when on home page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
      </MemoryRouter>
    );
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const cartLink = screen.getByRole('link', { name: /cart/i });
    expect(homeLink.className).toMatch(/active/);
    expect(cartLink.className).not.toMatch(/active/);
  });

  it('marks cart link as active when on cart page', () => {
    render(
      <MemoryRouter initialEntries={['/cart']}>
        <Navbar />
      </MemoryRouter>
    );
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const cartLink = screen.getByRole('link', { name: /cart/i });
    expect(cartLink.className).toMatch(/active/);
    expect(homeLink.className).not.toMatch(/active/);
  });
});

TestWrapper.propTypes = {
  children: PropTypes.any,
};
