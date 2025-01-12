import PropTypes from 'prop-types';
import style from './CartCard.module.css';
import { useState, useEffect } from 'react';

export default function CartCard({
  id = '000',
  image = { url: 'https://picsum.photos/200', alt: 'sample image' },
  title = 'Product Title',
  price = 'Product Price',
  description = 'Product Description',
  quantity = 0,
  category = 'Product Category',
  onButtonClick,
  onQuantityChange,
}) {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const [quantityInputVisible, setQuantityInputVisible] = useState(false);

  useEffect(() => {
    setCurrentQuantity(quantity);
  }, [quantity]);

  function handleRemoveFromCart() {
    const product = {
      id,
      image,
      title,
      price,
      description,
      category,
      quantity: currentQuantity,
    };
    onButtonClick?.(product);
  }

  function updateQuantity(e) {
    const newQuantity = Math.max(0, parseInt(e.target.value));
    setCurrentQuantity(newQuantity);
    onQuantityChange?.(id, newQuantity);
  }

  function toggleQuantityInput() {
    setQuantityInputVisible(!quantityInputVisible);
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
        <div className="quantity__container">
          <label htmlFor="quantity">
            Qty: {!quantityInputVisible && quantity}
          </label>
          <input
            hidden={!quantityInputVisible}
            className={style.quantity__input}
            name="quantity"
            type="number"
            value={currentQuantity}
            min="0"
            onChange={updateQuantity}
            data-testid="product__quantity"
          ></input>
        </div>

        <button
          className={
            quantityInputVisible ? style.done__button : style.update__button
          }
          onClick={toggleQuantityInput}
          data-testid="product__update__quantity"
        >
          {quantityInputVisible ? 'Done' : 'Update Quantity'}
        </button>
      </div>
      <button
        className={style.remove__button}
        onClick={handleRemoveFromCart}
        data-testid="product__remove__from__cart"
      >
        Remove
      </button>
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
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onButtonClick: PropTypes.func,
  onQuantityChange: PropTypes.func,
};
