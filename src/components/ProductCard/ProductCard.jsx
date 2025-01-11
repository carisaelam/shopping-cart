import PropTypes from 'prop-types';
import style from './ProductCard.module.css';
import { useState } from 'react';

export default function ProductCard({
  id = '000',
  image = { url: 'https://picsum.photos/200', alt: 'sample image' },
  title = 'Product Title',
  price = 'Product Price',
  description = 'Product Description',
  category = 'Product Category',
  isInCart = false,
  onButtonClick,
}) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  function handleButtonClick() {
    const product = { id, image, title, price, description, category };
    onButtonClick?.(product);
  }

  const MAX_CHARS = 150;

  function toggleDescription() {
    setShowFullDescription(!showFullDescription);
  }

  const truncatedDescription =
    description.length > MAX_CHARS && !showFullDescription
      ? description.slice(0, MAX_CHARS) + '...'
      : description;

  return (
    <div className={style.card__container}>
      <div className={style.image__container}>
        <img data-testid="product__image" src={image.url} alt={image.alt} />
      </div>
      <div className={style.details__container}>
        <h3 data-testid="product__title">{title}</h3>
        <p hidden data-testid="product__id">
          {id}
        </p>
        <p data-testid="product__price">${price}</p>

        <p
          data-testid="product__description"
          className={style.product__description}
        >
          {truncatedDescription}
          {description.length > 200 && (
            <span className={style.see__more} onClick={toggleDescription}>
              {showFullDescription ? 'see less' : 'see more'}
            </span>
          )}
        </p>

        <p data-testid="product__category" hidden>
          {category}
        </p>
      </div>
      <div className={style.button__container}>
        <button
          className={isInCart ? style.remove__button : style.add__button}
          onClick={handleButtonClick}
          data-testid="product__add__to__cart"
        >
          {isInCart ? 'Remove from Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.object,
  title: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  description: PropTypes.string,
  category: PropTypes.string,
  isInCart: PropTypes.bool,
  onButtonClick: PropTypes.func,
};
