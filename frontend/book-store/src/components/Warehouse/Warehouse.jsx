import styles from "./Warehouse.module.css";
import WhBookCard from "./WhBookCard/WhBookCard";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Clients() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const addBook = () => {
    navigate("/employee/add-book");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/delete-book/${id}`, {
        withCredentials: true,
      });
      setBooks((prevBooks) => prevBooks.filter((emp) => emp.id !== id));
    } catch (e) {
      console.error("ошибка при удалении сотрудника: ", e);
    }
  };

  const handleEdit = (id) => {
    navigate(`/warehouse/edit-book/${id}`);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/", {
          withCredentials: true,
        });
        console.log(response.data);
        setBooks(response.data);
        setError(null);
      } catch (err) {
        console.log(err);
        setError("Ошибка при загрузке клиентов");
        setBooks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className={styles.header}>
        <Link to="/employee">
          <div className={styles.link}>В сотрудника</div>
        </Link>
        <Link to="/admin">
          <div className={styles.link}>В админку</div>
        </Link>
      </div>
      <div className={styles.main}>
        <h1>Список книг</h1>
        <Button onClick={addBook} style={"buy"}>
          Добавить книгу
        </Button>
        {books.map((book) => (
          <div className={styles.book} key={book.id}>
            <WhBookCard
              id={book.id}
              title={book.title}
              description={book.description}
              author={book.author}
              language={book.language}
              year={book.year}
              quantOfPages={book.quantOfPages}
              quantInStock={book.quantInStock}
              weight={book.weight}
              bookImg={book.bookImg ?? null}
              price={book.price}
              discount={book.discount}
            />
            <div className={styles.btns}>
              <button
                className={styles.btn}
                onClick={() => handleEdit(book.id)}
              >
                Изменить
              </button>
              <button
                className={styles.btn}
                onClick={() => handleDelete(book.id)}
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Clients;
