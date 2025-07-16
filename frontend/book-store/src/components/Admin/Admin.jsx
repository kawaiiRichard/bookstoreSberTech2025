import styles from "./Admin.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [counts, setCounts] = useState({
    employees: 0,
    clients: 0,
    books: 0,
  });
  const [totalBooksInStock, setTotalBooksInStock] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/counts", { withCredentials: true })
      .then((response) => {
        setCounts(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных:", error);
      });
    axios
      .get("http://localhost:8080/books/total-stock", { withCredentials: true })
      .then((response) => {
        setTotalBooksInStock(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении общего количества книг:", error);
      });
  }, []);

  return (
    <>
      <div className={styles.header}>
        <Link to="/">
          <div className={styles.link}>В магазин</div>
        </Link>
        <Link to="/admin/employees">
          <div className={styles.link}>
            Посмотреть сотрудников ({counts.employees})
          </div>
        </Link>
        <Link to="/admin/clients">
          <div className={styles.link}>
            Посмотреть клиентов ({counts.clients})
          </div>
        </Link>
        <Link to="/warehouse">
          <div className={styles.link}>Посмотреть книги ({counts.books})</div>
        </Link>
      </div>
      <div className={styles.main}>
        <h1>Админка</h1>
        <div className={styles.statistic}>
          <div className={styles.title}>Статистика:</div>
          <div className={styles["stat-item"]}>
            Количество сотрудников: {counts.employees}
          </div>
          <div className={styles["stat-item"]}>
            Количество клиентов: {counts.clients}
          </div>
          <div className={styles["stat-item"]}>
            Количество наименований книг: {counts.books}
          </div>
          <div className={styles["stat-item"]}>
            Общее количество книг на складе: {totalBooksInStock}
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
