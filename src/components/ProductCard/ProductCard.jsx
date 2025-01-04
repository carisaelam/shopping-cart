import PropTypes from 'prop-types';
import style from './ProductCard.module.css';

export default function ProductCard({
  image = { url: 'https://picsum.photos/200', alt: 'sample image' },
  title = 'Product Title',
  price = 'Product Price',
  description = 'Product Description',
  category = 'Product Category',
}) {
  return (
    <div className={style.card__container}>
      <div className={style.image__container}>
        <img data-testid="product__image" src={image.url} alt={image.alt} />
      </div>
      <div className={style.details__container}>
        <h3 data-testid="product__title">{title}</h3>
        <p data-testid="product__price">${price}</p>
        <p data-testid="product__description">{description}</p>
        <p data-testid="product__category">{category}</p>
      </div>
      <div className={style.button__container}>
        <button data-testid="product__add__to__cart">Add to Cart</button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  image: PropTypes.object,
  title: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  description: PropTypes.string,
  category: PropTypes.string,
};
