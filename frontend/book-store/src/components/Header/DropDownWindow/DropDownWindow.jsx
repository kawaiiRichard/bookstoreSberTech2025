import styles from "./DropDownWindow.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

function DropDownWindow() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  return (
    <div className={styles.main}>
      {!user && (
        <>
          <Link to="/register">
            <div className={styles.link}>Регистрация</div>
          </Link>
          <Link to="/login">
            <div className={styles.link}>Войти</div>
          </Link>
        </>
      )}
      {user && (
        <div onClick={handleLogout} className={styles.link}>
          Выйти
        </div>
      )}
    </div>
  );
}

export default DropDownWindow;
