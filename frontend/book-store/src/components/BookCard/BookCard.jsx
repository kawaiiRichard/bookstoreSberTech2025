import "./BookCard.css";
import Button from "../Button/Button";
import favoriteEmpty from "../../assets/svg/favoriteEmpty.svg";
import favoriteFull from "../../assets/svg/favoriteFull.svg";

import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoriteContext";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

import noImage from "../../assets/svg/NoImage.svg";

function BookCard({
  id,
  title,
  author,
  price,
  imgSrc = null,
  discount = 0,
  weight,
  quantity,
  clickBuyAction,
  clickFavAction,
}) {
  const { favorites, toggleFavorite } = useFavorites();
  const { cartItems, addItems } = useContext(CartContext);
  const isFav = favorites.some((fav) => fav.id === id);
  const isInCart = cartItems.some(
    (item) => item.book?.id === id || item.id === id
  );

  const handleBuyClick = () => {
    addItems({
      id,
      title,
      author,
      price,
      imgSrc,
      discount,
      weight,
      quantity,
    });

    clickBuyAction();
  };

  const handleFavClick = () => {
    if (!isFav) {
      clickFavAction();
    }
    toggleFavorite({ id, title, author, price, imgSrc, discount });
  };

  const totalPrice = price * ((100 - discount) / 100);

  return (
    <>
      <div className="container">
        {quantity < 5 && quantity > 0 && (
          <div className="quantity low">Осталось мало</div>
        )}

        {quantity === 0 && (
          <div className="overlay-out-of-stock">
            <div className="overlay-out-of-stock-text">
              Товар временно отсутствует
            </div>
          </div>
        )}

        <Link to={`/book/${id}`}>
          <img
            src={imgSrc === null ? noImage : imgSrc}
            alt={title}
            className="book-img"
          />
        </Link>
        <div className="book-text">
          <Link to={`/book/${id}`}>
            <div className="book-title">{title}</div>
            <div className="book-author">{author}</div>
          </Link>
          <br />
          <div className="price">
            <div className="book-price">{totalPrice} ₽</div>
            {discount === 0 ? (
              ""
            ) : (
              <div className="book-price old">{price} ₽</div>
            )}
          </div>
        </div>
        <div className="btns">
          {isInCart ? (
            <Button style={"in-cart"}>
              <Link to="/cart">Оформить</Link>
            </Button>
          ) : (
            <Button onClick={handleBuyClick} style={"buy"}>
              Купить
            </Button>
          )}

          <img
            onClick={handleFavClick}
            className="fav-bc"
            src={isFav ? favoriteFull : favoriteEmpty}
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default BookCard;
