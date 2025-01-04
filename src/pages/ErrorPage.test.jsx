import { it, describe, expect } from 'vitest';
import ErrorPage from './ErrorPage';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router';

describe('Error Page', () => {
  it('should render the Error Page', () => {
    const router = createMemoryRouter(
      [
        {
          path: '*',
          element: <ErrorPage />,
        },
      ],
      { initialEntries: ['/error'] }
    );

    render(<RouterProvider router={router} />);

    const errorText = screen.getByRole('heading', { name: /error/i });
    expect(errorText).toBeInTheDocument();
  });
});
