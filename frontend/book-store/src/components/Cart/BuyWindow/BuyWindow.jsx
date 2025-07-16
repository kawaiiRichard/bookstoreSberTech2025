import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";

import styles from "./BuyWindow.module.css";
import Button from "../../Button/Button";
import Input from "../../Input/Input";

import rightArrow from "../../../assets/svg/ArrowRight.svg";

function BuyWindow() {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  const [inputValue, setInputValue] = useState("");
  const [isPromoCorrect, setIsPromoCorrect] = useState(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  console.log("Cart items in BuyWindow:", cartItems);

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.book?.price ?? item.price ?? 0;
    const quantity = item.quantity ?? 0;
    return sum + Number(price) * Number(quantity);
  }, 0);

  const totalWeight = cartItems.reduce((sum, item) => {
    const weight = item.book?.weight ?? item.weight ?? 0;
    const quantity = item.quantity ?? 0;
    return sum + Number(weight) * Number(quantity);
  }, 0);

  const totalDiscountValue = cartItems.reduce((sum, item) => {
    const price = item.book?.price ?? item.price ?? 0;
    const discount = item.book?.discount ?? item.discount ?? 0;
    const quantity = item.quantity ?? 0;
    return sum + (Number(price) * Number(discount) * Number(quantity)) / 100;
  }, 0);

  const totalPriceToPay = Number((totalPrice - totalDiscountValue).toFixed(2));

  const totalCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity ?? 0),
    0
  );
  const totalBonus = ((totalPrice / 100) * 5).toFixed(0);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value === "") {
      setIsButtonClicked(false);
    }
  };

  const listOfPromo = ["promo_code", "disc15", "15perc", "Books4ever"];

  const handleClick = () => {
    setIsButtonClicked(true);
    setIsPromoCorrect(listOfPromo.includes(inputValue));
  };

  function getProductWordEnding(count) {
    if (count % 100 >= 11 && count % 100 <= 14) {
      return "товаров";
    }

    switch (count % 10) {
      case 1:
        return "товар";
      case 2:
      case 3:
      case 4:
        return "товара";
      default:
        return "товаров";
    }
  }

  const redirectToPay = () => {
    navigate("/placing-an-order-window");
  };

  return (
    <>
      <div className={styles["buy-window"]}>
        <div className={styles.header}>
          <div className={styles.container}>
            <Input
              onChange={handleInputChange}
              value={inputValue}
              placeholder={"Введите промокод"}
              type={"text"}
            />
            <div onClick={handleClick} className={styles.button}>
              <img src={rightArrow} alt="" />
            </div>
          </div>
          {isButtonClicked &&
            (isPromoCorrect ? (
              <div className={`${styles.promo} ${styles.correct}`}>
                Промокод успешно применён
              </div>
            ) : (
              <div className={`${styles.promo} ${styles.incorrect}`}>
                Такого промокода нет
              </div>
            ))}
        </div>

        <div className={styles.main}>
          <div className={styles.container}>
            <div className={styles.text}>
              {totalCount} {getProductWordEnding(totalCount)},{" "}
              {totalWeight.toFixed(2)} кг
            </div>
            <div className={styles.text}>{totalPrice} ₽</div>
          </div>

          <div className={styles.container}>
            <div className={styles.text}>Скидка по акциям</div>
            <div className={styles["discount-text"]}>
              {-totalDiscountValue.toFixed(2)}₽
            </div>
          </div>

          <div className={styles.container}>
            <div className={styles.text}>Итого</div>
            <div className={styles.text}>{totalPriceToPay}</div>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.text}>Бонусов за покупку: {totalBonus}</div>
          <div className={styles.text}>Выберете способ оплаты</div>
          <select className={styles.select} name="" id="">
            <option value="">СБП</option>
            <option value="">Банковская Карта</option>
            <option value="">Оплата при получении</option>
          </select>
          <Button onClick={redirectToPay} style={"buy"}>
            Перейти к оформлению
          </Button>
        </div>
      </div>
    </>
  );
}

export default BuyWindow;
