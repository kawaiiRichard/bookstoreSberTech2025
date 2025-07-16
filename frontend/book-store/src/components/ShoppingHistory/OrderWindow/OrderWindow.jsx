import styles from "./OrderWindow.module.css";

import img from "../../../assets/images/horus-heresy-omnibus-first-book.jpg";

function OrderWindow() {
  return (
    <>
      <div className={styles.order}>
        <div className={styles.header}>
          <div className={styles.title}>Номер заказа: </div>
          <div className={styles["header-text"]}>
            <div className="">Дата заказа</div>
            <div className="">Статус заказа: активный/завершённый</div>
            <div className="">Цена: </div>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles["footer-text"]}>
            <div className="">Название</div>
            <div className="">Автор</div>
          </div>
          <img className={styles.img} src={img} alt="Картинка" />
        </div>
      </div>
    </>
  );
}

export default OrderWindow;
