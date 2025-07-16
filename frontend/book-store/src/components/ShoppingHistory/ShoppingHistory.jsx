import styles from "./ShoppingHistory.module.css";
import OrderWindow from "./OrderWindow/OrderWindow";

function ShoppingHistory() {
  return (
    <>
      <div className={styles.history}>
        <div className={styles.title}>История заказов</div>
        <div className={styles.orders}>
          {}
          <OrderWindow />
        </div>
      </div>
    </>
  );
}

export default ShoppingHistory;
