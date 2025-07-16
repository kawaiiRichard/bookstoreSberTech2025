import styles from "./PlacingAnOrderWindow.module.css";
import Button from "../Button/Button";
import Input from "../Input/Input";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

function PlacingAnOrderWindow() {
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);

  const handleClick = () => {
    clearCart();
    console.log("Симуляция оплаты");
    navigate("/");
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.main}>
        <div className={styles.inner}>
          <div className={styles.text}>Укажите адрес доставки:</div>
          <Input style={"order"} />

          <div className={styles.text}>Выберете способ оплаты</div>
          <select className={styles.select} name="" id="">
            <option value="">СБП</option>
            <option value="">Банковская Карта</option>
            <option value="">Оплата при получении</option>
          </select>
        </div>
        <Button onClick={handleClick} style={"buy"}>
          Перейти к оплате
        </Button>
      </div>
    </div>
  );
}

export default PlacingAnOrderWindow;
