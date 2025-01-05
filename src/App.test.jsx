import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import App from './App';
import Cart from './pages/Cart';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';

// App Navigation
describe('App Navigation', () => {
  const renderApp = () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        {' '}
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders the app with navigation', () => {
    renderApp();
    expect(screen.getByText('Store')).toBeInTheDocument();
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const cartLink = screen.getByRole('link', { name: /cart/i });
    expect(homeLink).toBeInTheDocument();
    expect(cartLink).toBeInTheDocument();
  });

  it('should navigate to home page upon clicking home link', async () => {
    renderApp();
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const user = userEvent.setup();
    await user.click(homeLink);

    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });

  it('should navigate to cart page upon clicking cart link', async () => {
    renderApp();
    const cartLink = screen.getByRole('link', { name: /cart/i });
    const user = userEvent.setup();
    await user.click(cartLink);

    expect(screen.getByText(/your cart/i)).toBeInTheDocument();
  });
});
