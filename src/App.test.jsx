import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import App from './App';
import Cart from './pages/Cart';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';

globalThis.global = globalThis;

const mockProducts = [
  { id: 1, title: 'Product 1', price: 10 },
  { id: 2, title: 'Product 2', price: 12 },
];

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockProducts),
  })
);

// App Navigation
describe('App Navigation', () => {
  const renderApp = async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
  };

  it('renders the app with navigation', async () => {
    await renderApp();
    expect(screen.getByText('Store')).toBeInTheDocument();
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const cartLink = screen.getByRole('link', { name: /cart/i });
    expect(homeLink).toBeInTheDocument();
    expect(cartLink).toBeInTheDocument();
  });

  it('should navigate to home page upon clicking home link', async () => {
    await renderApp();
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const user = userEvent.setup();
    await user.click(homeLink);

    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });

  it('should navigate to cart page upon clicking cart link', async () => {
    await renderApp();
    const cartLink = screen.getByRole('link', { name: /cart/i });
    const user = userEvent.setup();
    await user.click(cartLink);

    expect(screen.getByRole('heading', { name: /your cart/i }));
  });
});
