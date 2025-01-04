import PropTypes from 'prop-types';

export default function ProductCard({
  image = { url: 'https://picsum.photos/200', alt: 'sample image' },
  title = 'Product Title',
  price = 'Product Price',
  description = 'Product Description',
}) {
  return (
    <div>
      <img data-testid="product__image" src={image.url} alt={image.alt} />
      <h3 data-testid="product__title">{title}</h3>
      <p data-testid="product__price">{price}</p>
      <p data-testid="product__description">{description}</p>
    </div>
  );
}

ProductCard.propTypes = {
  image: PropTypes.object,
  title: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  description: PropTypes.string,
};
