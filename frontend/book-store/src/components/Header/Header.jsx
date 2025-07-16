import styles from "./Header.module.css";
import shoppingCart from "../../assets/svg/shoppingCart.svg";
import bookShelf from "../../assets/svg/bookShelf.svg";
import favoriteEmpty from "../../assets/svg/favoriteEmpty.svg";
import accountIcon from "../../assets/svg/accountIcon.svg";
import DropDownWindow from "./DropDownWindow/DropDownWindow";
import Icon from "./Icon/Icon";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";

function Header() {
  const { user } = useContext(UserContext);
  const [isHovered, setIsHovered] = useState(false);

  const getUserRoleText = () => {
    if (!user) return null;

    switch (user.role) {
      case "ROLE_CLIENT":
        return "Пользователь";
      case "ROLE_ADMIN":
        return "Администратор";
      case "ROLE_EMPLOYEE":
        return "Сотрудник";
      default:
        return user.role;
    }
  };

  return (
    <div className={styles.container}>
      {user && (
        <div className={styles["role-info"]}>
          <div className="">Вы вошли под ником {user.username},</div>
          <div className="">ваша роль ({getUserRoleText()})</div>
        </div>
      )}
      <div className={styles.header}>
        <Link to="/">
          <div className={styles.headerLeft}>
            <img className={styles.logo} src={bookShelf} alt="" />
            <div className={styles.title}>Книжная полка</div>
          </div>
        </Link>

        <div className={styles.headerRight}>
          <Link to="/favorite">
            <Icon image={favoriteEmpty}>Избранное</Icon>
          </Link>

          <Link to="/cart">
            <Icon image={shoppingCart}>Корзина</Icon>
          </Link>

          <div
            className={styles.accountWrapper}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {user ? (
              <Link to="/account">
                <Icon image={accountIcon}>Личный кабинет</Icon>
              </Link>
            ) : (
              <Link to="/login">
                <Icon image={accountIcon}>Войти</Icon>
              </Link>
            )}
            {isHovered && <DropDownWindow />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
