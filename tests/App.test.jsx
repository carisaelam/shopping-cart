import { describe, it, expect } from 'vitest';

import { render, screen } from '@testing-library/react';

import App from '../src/App';

describe('App component', () => {
  it('renders correct heading', () => {
    render(<App />);
    screen.debug();
  });
});
