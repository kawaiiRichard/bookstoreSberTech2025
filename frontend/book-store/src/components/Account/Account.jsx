import styles from "./Account.module.css";
import { Link } from "react-router-dom";

function Account() {
  return (
    <>
      <div className={styles.account}>
        <h1>Личный кабинет</h1>
        <div className={styles.link}>
          <Link to="/shopping-history">История заказов</Link>
        </div>
      </div>
    </>
  );
}

export default Account;
