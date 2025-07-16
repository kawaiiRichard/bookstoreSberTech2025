import styles from "./Cart.module.css";
import BuyWindow from "./BuyWindow/BuyWindow";
import Button from "../Button/Button";
import BookWindow from "./BookWindow/BookWindow";
import Empty from "../Empty/Empty";

import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

function Cart() {
  const { clearCart, cartItems, removeItem } = useContext(CartContext);

  const deleteBookById = (id) => {
    removeItem(id);
  };

  const clearBooks = () => {
    clearCart();
  };

  return (
    <>
      <div className={styles.cart}>
        <div className={styles["left-pannel"]}>
          <h1>Корзина</h1>
          <div className={styles.books}>
            {cartItems.length === 0 && (
              <Empty>Здесь появятся ваши покупки</Empty>
            )}

            {cartItems.map((item) => (
              <BookWindow
                key={item.id}
                id={item.id}
                title={item.book?.title || item.title}
                author={item.book?.author || item.author}
                price={item.book?.price || item.price}
                discount={item.book?.discount || item.discount || 0}
                imgSrc={item.book?.imgSrc || item.imgSrc}
                weight={item.book?.weight || item.weight}
                quantity={item.quantity}
                deleteItem={deleteBookById}
              />
            ))}
          </div>
        </div>
        <div className={styles["right-pannel"]}>
          <Button onClick={clearBooks} style={"clear"}>
            Очистить
          </Button>
          <BuyWindow />
        </div>
      </div>
    </>
  );
}

export default Cart;
