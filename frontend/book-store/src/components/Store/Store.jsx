import styles from "./Store.module.css";
import BookCard from "../BookCard/BookCard";
import AddedToWindow from "./AddedToWindow/AddedToWindow";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

// import bookImg from "../../assets/images/horus-heresy-omnibus-first-book.jpg";
import noImage from "../../assets/svg/NoImage.svg";

function Store() {
  const [notifications, setNotifications] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sortOrder, setSortOrder] = useState("none");
  const [sortBy, setSortBy] = useState("price");
  const [filterStock, setFilterStock] = useState("all");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/public/books", {
          withCredentials: true,
        });
        console.log("Ответ сервера:", response.data);
        setBooks(response.data);
      } catch (err) {
        console.error("Ошибка загрузки книг:", err);
        setError("Не удалось загрузить каталог");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const showNotification = (type) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  const handleBuyClick = () => showNotification("cart");
  const handleFavClick = () => showNotification("fav");

  const countTotalPrice = (price, discount) => {
    return price * ((100 - discount) / 100);
  };

  const sortedBooks = useMemo(() => {
    const filteredBooks =
      filterStock === "only-in-stock"
        ? books.filter((book) => book.quantInStock > 0)
        : books;

    const getTotalPrice = (book) =>
      countTotalPrice(book.price, book.discount ?? 0);

    return [...filteredBooks].sort((a, b) => {
      if (filterStock === "all") {
        if (a.quantInStock === 0 && b.quantInStock > 0) return 1;
        if (a.quantInStock > 0 && b.quantInStock === 0) return -1;
      }

      if (sortBy === "price") {
        const priceA = getTotalPrice(a);
        const priceB = getTotalPrice(b);

        if (sortOrder === "asc") return priceA - priceB;
        if (sortOrder === "desc") return priceB - priceA;
      } else if (sortBy === "quantity") {
        if (sortOrder === "asc") return a.quantInStock - b.quantInStock;
        if (sortOrder === "desc") return b.quantInStock - a.quantInStock;
      }

      return 0;
    });
  }, [books, sortOrder, sortBy, filterStock]);

  if (loading) return <div>Загрузка книг...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <>
      <div className={styles.title}>Каталог</div>

      <div className={styles.main}>
        <div className={styles.filters}>
          <div className={styles.filter}>
            <label className={styles.label} htmlFor="sortBy">
              Сортировать по:{" "}
            </label>
            <select
              className={styles.select}
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="price">Цене</option>
              <option value="quantity">Количеству на складе</option>
            </select>
          </div>

          <div className={styles.filter}>
            <label className={styles.label} htmlFor="sortOrder">
              Порядок сортировки:{" "}
            </label>
            <select
              className={styles.select}
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="none">Без сортировки</option>
              <option value="asc">По возрастанию</option>
              <option value="desc">По убыванию</option>
            </select>
          </div>

          <div className={styles.filter}>
            <label className={styles.label} htmlFor="filterStock">
              Показывать:{" "}
            </label>
            <select
              className={styles.select}
              id="filterStock"
              value={filterStock}
              onChange={(e) => setFilterStock(e.target.value)}
            >
              <option value="all">Все</option>
              <option value="only-in-stock">В наличии</option>
            </select>
          </div>
        </div>

        <div className={styles.showcase}>
          {sortedBooks.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              price={book.price}
              imgSrc={book.imgSrc || noImage}
              weight={book.weight}
              discount={book.discount ?? 0}
              quantity={book.quantInStock}
              clickBuyAction={handleBuyClick}
              clickFavAction={handleFavClick}
            />
          ))}
        </div>
        <div className={styles.notifications}>
          {notifications.map((notification, index) => (
            <AddedToWindow
              key={notification.id}
              style={notification.type}
              offset={index * 60}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Store;
