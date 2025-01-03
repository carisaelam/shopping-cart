import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Navbar from './Navbar';

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

describe('Home link behavior', () => {
  it('should call onClick handler when clicked', async () => {
    const handleClick = vi.fn();

    render(
      <MemoryRouter>
        <Navbar onClick={handleClick} />
      </MemoryRouter>
    );
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const user = userEvent.setup();

    await user.click(homeLink);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
