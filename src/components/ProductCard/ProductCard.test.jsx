import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';

describe('Product Card component', () => {
  // Rendering
  it('should render a product card', () => {
    render(<ProductCard />);
    expect(screen.getByTestId('product__title')).toBeInTheDocument();
  });

  it('should render the title prop correctly', () => {
    render(<ProductCard title="juice" />);
    expect(screen.getByTestId('product__title')).toHaveTextContent('juice');
  });

  it('should render the price prop correctly', () => {
    render(<ProductCard price="3" />);
    expect(screen.getByTestId('product__price')).toHaveTextContent('3');
  });

  it('should render default title', () => {
    render(<ProductCard />);
    expect(screen.getByTestId('product__title')).toHaveTextContent('Product Title');
  });

  it('should render default price', () => {
    render(<ProductCard />);
    expect(screen.getByTestId('product__price')).toHaveTextContent('Product Price');
  });
});
