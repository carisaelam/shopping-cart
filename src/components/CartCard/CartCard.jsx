import PropTypes from 'prop-types';
import style from './CartCard.module.css';

export default function CartCard({
  id = '000',
  image = { url: 'https://picsum.photos/200', alt: 'sample image' },
  title = 'Product Title',
  price = 'Product Price',
  description = 'Product Description',
  category = 'Product Category',
  onAddToCart,
}) {
  function handleRemoveFromCart() {
    const product = { id, image, title, price, description, category };
    onAddToCart?.(product);
  }
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
      </div>
      <div className={style.button__container}>
        <button onClick={handleRemoveFromCart} data-testid="product__remove__from__cart">
          Remove
        </button>
      </div>
    </div>
  );
}

CartCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.object,
  title: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  description: PropTypes.string,
  category: PropTypes.string,
  onAddToCart: PropTypes.func,
};
