import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  // Quantity
  it('should render the initial quantity correctly', () => {
    render(<CartCard quantity={5} />);
    expect(screen.getByText('Qty: 5')).toBeInTheDocument();
  });

  it('should toggle quantity input visibility when update button is clicked', async () => {
    render(<CartCard />);
    const user = userEvent.setup();
    const updateButton = screen.getByTestId('product__update__quantity');
    await user.click(updateButton);
    expect(screen.getByTestId('product__quantity')).toBeVisible();
    await user.click(updateButton);
    expect(screen.getByTestId('product__quantity')).not.toBeVisible();
  });

  it('should update quantity when input is changed', async () => {
    const mockOnQualityChange = vi.fn();
    render(<CartCard id="1" onQuantityChange={mockOnQualityChange} />);
    const updateButton = screen.getByTestId('product__update__quantity');
    const user = userEvent.setup();

    await user.click(updateButton);
    const quantityInput = screen.getByTestId('product__quantity');
    await user.type(quantityInput, '10');
    expect(mockOnQualityChange).toHaveBeenCalledWith('1', 10);
  });

  // Event handler
  it('should call onButtonClick when remove button is clicked', async () => {
    const mockOnButtonClick = vi.fn();
    render(<CartCard onButtonClick={mockOnButtonClick} />);
    const removeButton = screen.getByTestId('product__remove__from__cart');
    const user = userEvent.setup();

    await user.click(removeButton);
    expect(mockOnButtonClick).toHaveBeenCalled();
  });

  // Empty props
  it('should handle empty props gracefully', () => {
    render(<CartCard id="" title="" price="" quantity="" />);
    expect(screen.getByTestId('product__id')).toHaveTextContent('');
    expect(screen.getByTestId('product__title')).toHaveTextContent('');
    expect(screen.getByTestId('product__price')).toHaveTextContent('$');
    expect(screen.getByTestId('product__quantity')).toHaveTextContent('');
  });

  // Accessibility
  it('should be keyboard accessible', () => {
    render(<CartCard />);
    const removeButton = screen.getByTestId('product__remove__from__cart');
    removeButton.focus();
    expect(removeButton).toHaveFocus();
  });
});
