import PropTypes from 'prop-types';

export default function ProductCard({
  title = 'Product Title',
  price = 'Product Price',
}) {
  return (
    <div>
      <h3 data-testid="product__title">{title}</h3>;
      <p data-testid="product__price">{price}</p>
    </div>
  );
}

ProductCard.propTypes = {
  title: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
