import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';

describe('Product Card component', () => {
  // Rendering
  it('should render a product card', () => {
    render(<ProductCard />);
    expect(screen.getByTestId('product__title')).toBeInTheDocument();
  });

  // Props

  // Image
  it('should render the img prop correctly', () => {
    render(
      <ProductCard
        img={{ url: 'https://picsum.photos/200', alt: 'sample image' }}
      />
    );

    const image = screen.getByTestId('product__image');
    expect(image.src).toEqual('https://picsum.photos/200');
  });

  it('should render default image', () => {
    render(<ProductCard />);
    const sampleImage = {
      url: 'https://picsum.photos/200',
      alt: 'sample image',
    };
    expect(screen.getByTestId('product__image').src).toEqual(sampleImage.url);
  });

  // Title
  it('should render the title prop correctly', () => {
    render(<ProductCard title="juice" />);
    expect(screen.getByTestId('product__title')).toHaveTextContent('juice');
  });

  it('should render default title', () => {
    render(<ProductCard />);
    expect(screen.getByTestId('product__title')).toHaveTextContent(
      'Product Title'
    );
  });

  // Price
  it('should render the price prop correctly', () => {
    render(<ProductCard price="3" />);
    expect(screen.getByTestId('product__price')).toHaveTextContent('3');
  });

  it('should render default price', () => {
    render(<ProductCard />);
    expect(screen.getByTestId('product__price')).toHaveTextContent(
      'Product Price'
    );
  });

  // Description
  it('should render the description prop correctly', () => {
    render(<ProductCard description="example description" />);
    expect(screen.getByTestId('product__description')).toHaveTextContent(
      'example description'
    );
  });

  it('should render default description', () => {
    render(<ProductCard />);
    expect(screen.getByTestId('product__description')).toHaveTextContent(
      'Product Description'
    );
  });

  // Add to Cart Button
  it('should render the add to cart button correctly', () => {
    render(<ProductCard />);
    expect(screen.getByTestId('product__add__to__cart')).toBeInTheDocument();
  });
});
