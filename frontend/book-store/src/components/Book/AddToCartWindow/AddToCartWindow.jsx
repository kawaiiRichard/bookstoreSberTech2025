import styles from "./AddToCartWindow.module.css";
import Button from "../../Button/Button";
import { useContext } from "react";
import { useFavorites } from "../../../context/FavoriteContext";
import { CartContext } from "../../../context/CartContext";
import { Link } from "react-router-dom";

import favoriteEmpty from "../../../assets/svg/favoriteEmpty.svg";
import favoriteFull from "../../../assets/svg/favoriteFull.svg";

function AddToCartWindow({
  title,
  author,
  price,
  discount,
  quantInStock,
  id,
  clickBuyAction,
  clickFavAction,
  imgSrc,
  weight,
}) {
  const { favorites, toggleFavorite } = useFavorites();
  const { cartItems, addItems } = useContext(CartContext);
  const isFav = favorites.some((fav) => fav.id === id);
  const isInCart = cartItems.some((inCart) => inCart.id === id);

  const handleBuyClick = () => {
    addItems({
      id,
      title,
      author,
      price,
      imgSrc,
      discount,
      weight,
      quantInStock,
    });

    clickBuyAction();
  };

  const handleFavClick = () => {
    if (!isFav) {
      clickFavAction();
    }
    toggleFavorite({ id, title, author, price, imgSrc, discount });
  };

  const getQuantityInfo = (quant) => {
    if (quant > 0 && quant <= 5) {
      return { text: "Осталось мало!", style: "low" };
    } else if (quant > 5) {
      return { text: "Есть в наличии", style: "many" };
    } else {
      return { text: "Нет в наличии", style: "none" };
    }
  };

  const quantityInfo = getQuantityInfo(quantInStock);

  const totalPrice = (price * (100 - discount)) / 100;

  return (
    <>
      <div className={styles["add-to-cart-window"]}>
        <div className={styles.header}>
          <div className={styles[quantityInfo.style]}>{quantityInfo.text}</div>
          <div className={styles.price}>Цена: {price} ₽</div>
          {discount > 0 && (
            <div className="">
              <div className={styles.disc}>Скидка: {discount}%</div>
              <div className={styles.totalPrice}>
                Цена со скидкой: {totalPrice} ₽
              </div>
            </div>
          )}
        </div>

        <div className={styles.footer}>
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

export default AddToCartWindow;
