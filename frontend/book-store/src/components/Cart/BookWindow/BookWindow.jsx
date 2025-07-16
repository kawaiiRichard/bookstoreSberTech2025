import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { useFavorites } from "../../../context/FavoriteContext";

import styles from "./BookWindow.module.css";
import Button from "../../Button/Button";
import noImage from "../../../assets/svg/NoImage.svg";

function BookWindow({
  id,
  deleteItem,
  title,
  author,
  weight,
  price,
  discount,
  imgSrc,
  quantity,
}) {
  const { cartItems, inc, dec } = useContext(CartContext);

  const { favorites, toggleFavorite } = useFavorites();
  const isFav = favorites.some((fav) => fav.id === id);

  const currentItem = cartItems.find((item) => item.id === id);
  const count = currentItem ? currentItem.quantity : 1;

  const currentPrice = discount != 0 ? (price * (100 - discount)) / 100 : price;
  const totalPrice = (currentPrice * count).toFixed(2);
  const oldPrice = discount != 0 ? count * price : "";

  return (
    <>
      <div className={styles["book-window"]}>
        <div className={styles["left-pannel"]}>
          {imgSrc ? (
            <img className={styles.image} src={imgSrc} alt="" />
          ) : (
            <img className={styles.image} src={noImage} alt="" />
          )}
          <div className={styles.info}>
            <div className={styles["text-info"]}>
              <div className={styles.title}>{title}</div>
              <div className={styles.author}>{author}</div>
            </div>
            <div className={styles.weight}>Вес {weight} кг</div>
          </div>
        </div>
        <div className={styles["right-pannel"]}>
          <div className={styles["count-price"]}>
            <div className={styles.count}>
              <Button
                onClick={() => {
                  if (quantity === 1) {
                    deleteItem(id);
                  } else {
                    dec(id);
                  }
                }}
                style={"count-left"}
              >
                -
              </Button>
              <div className={styles.middle}>{quantity}</div>
              <Button onClick={() => inc(id)} style={"count-right"}>
                +
              </Button>
            </div>

            <div className={styles.prices}>
              <div className={styles.price}>{totalPrice}₽</div>
              {discount != 0 ? (
                <div className={styles.discount}>{oldPrice}₽</div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className={styles.container}>
            <div
              className={styles["add-to-fav"]}
              onClick={() =>
                toggleFavorite({ id, title, author, price, imgSrc })
              }
            >
              {isFav ? "В избранном" : "В избранное"}
            </div>
            <div onClick={() => deleteItem(id)} className={styles.delete}>
              Удалить
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookWindow;
