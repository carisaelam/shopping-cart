import Home from './pages/Home';
import Cart from './pages/Cart';

export const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
];
