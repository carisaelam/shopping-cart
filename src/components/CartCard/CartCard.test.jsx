import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CartCard from './CartCard';

describe('Cart Card component', () => {
  // Rendering
  it('should render a product card', () => {
    render(<CartCard />);
    expect(screen.getByTestId('product__title')).toBeInTheDocument();
  });

  // Props

  // Id
  it('should render the id prop correctly', () => {
    render(<CartCard id="1234" />);
    expect(screen.getByTestId('product__id')).toHaveTextContent('1234');
  });

  it('should render default title', () => {
    render(<CartCard />);
    expect(screen.getByTestId('product__title')).toHaveTextContent(
      'Product Title'
    );
  });

  // Image
  it('should render the img prop correctly', () => {
    render(
      <CartCard
        img={{ url: 'https://picsum.photos/200', alt: 'sample image' }}
      />
    );

    const image = screen.getByTestId('product__image');
    expect(image.src).toEqual('https://picsum.photos/200');
  });

  it('should render default image', () => {
    render(<CartCard />);
    const sampleImage = {
      url: 'https://picsum.photos/200',
      alt: 'sample image',
    };
    expect(screen.getByTestId('product__image').src).toEqual(sampleImage.url);
  });

  // Title
  it('should render the title prop correctly', () => {
    render(<CartCard title="juice" />);
    expect(screen.getByTestId('product__title')).toHaveTextContent('juice');
  });

  it('should render default title', () => {
    render(<CartCard />);
    expect(screen.getByTestId('product__title')).toHaveTextContent(
      'Product Title'
    );
  });

  // Price
  it('should render the price prop correctly', () => {
    render(<CartCard price="3" />);
    expect(screen.getByTestId('product__price')).toHaveTextContent('3');
  });

  it('should render default price', () => {
    render(<CartCard />);
    expect(screen.getByTestId('product__price')).toHaveTextContent(
      'Product Price'
    );
  });

  // Remove from Cart Button
  it('should render the remove from cart button correctly', () => {
    render(<CartCard />);
    expect(
      screen.getByTestId('product__remove__from__cart')
    ).toBeInTheDocument();
  });
});
