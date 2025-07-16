import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Book.module.css";
import AddToCartWindow from "./AddToCartWindow/AddToCartWindow";
import BookWindow from "./BookWindow/BookWindow";
import AddedToWindow from "../Store/AddedToWindow/AddedToWindow";
import noImage from "../../assets/svg/NoImage.svg";

function Book() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/books/${id}`);
        setBook(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!book) return <div>Книга не найдена</div>;

  const showNotification = (type) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  const handleBuyClick = () => showNotification("cart");
  const handleFavClick = () => showNotification("fav");

  return (
    <div className={styles.book}>
      <div className={styles.main}>
        <div className={styles["left-pannel"]}>
          <BookWindow
            title={book.title}
            author={book.author}
            bookImg={book.imgSrc || noImage}
            year={book.year}
            language={book.language}
            quantOfPages={book.quantOfPages}
            weight={book.weight}
            description={book.description}
          />
        </div>

        <div className={styles["right-pannel"]}>
          <AddToCartWindow
            imgSrc={book.imgSrc}
            title={book.title}
            author={book.author}
            id={id}
            price={book.price}
            discount={book.discount}
            quantInStock={book.quantInStock}
            weight={book.weight}
            clickBuyAction={handleBuyClick}
            clickFavAction={handleFavClick}
          />
        </div>
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
  );
}

export default Book;
