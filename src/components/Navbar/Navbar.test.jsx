import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Navbar from './Navbar';
import App from '../../App';



describe('Navbar component', () => {
  const renderWithRouter = (props = {}) =>
    render(
      <MemoryRouter>
        <Navbar {...props} />
      </MemoryRouter>
    );

  it('renders', () => {
    renderWithRouter();
    expect(screen.getByText('Store')).toBeInTheDocument();
  });

  it('includes a home link', () => {
    renderWithRouter();
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
  });

  it('includes a cart link', () => {
    renderWithRouter();
    const cartLink = screen.getByRole('link', { name: 'Cart' });
    expect(cartLink).toBeInTheDocument();
  });
});


describe('Navbar interaction', () => {
  const handleClick = vi.fn();

  const renderNavbar = () => {
    render(
      <MemoryRouter>
        <Navbar onClick={handleClick} />
      </MemoryRouter>
    );
  };

  it('should call onClick handler when clicked', async () => {
    renderNavbar();
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const user = userEvent.setup();

    await user.click(homeLink);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe('App Navigation', () => {
  const renderApp = () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  };

  it('should navigate to home page upon click', async () => {
    renderApp();
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const user = userEvent.setup();

    await user.click(homeLink);

    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });
 
  it('should navigate to cart page upon click', async () => {
    renderApp();
    const cartLink = screen.getByRole('link', { name: 'Cart' });
    const user = userEvent.setup();

    await user.click(cartLink);

    expect(screen.getByText(/your cart/i)).toBeInTheDocument();
  });
});
