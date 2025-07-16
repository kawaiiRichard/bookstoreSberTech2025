import styles from "./Employee.module.css";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Employee() {
  const navigate = useNavigate();

  const addBook = () => {
    navigate("/employee/add-book");
  };

  const logOut = async () => {
    try {
      await axios.post(
        "http://localhost:8080/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Вы успешно вышли");
      navigate("/");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
      navigate("/");
    }
  };

  return (
    <>
      <div className={styles.header}>
        <Button onClick={addBook} style={"buy"}>
          Добавить книгу
        </Button>
        <Link to="/warehouse">
          <div className={styles.link}>Посмотреть книги</div>
        </Link>
        <Button onClick={logOut} style={"pre-order"}>
          Выйти
        </Button>
      </div>

      <div className={styles.main}>
        <h1>Сотрудник</h1>
      </div>
    </>
  );
}

export default Employee;
