import styles from "./WhBookCard.module.css";
import noImage from "../../../assets/svg/NoImage.svg";

function WhBookCard({
  id,
  title,
  price,
  author,
  bookImg,
  year,
  language,
  quantOfPages,
  weight,
  description,
  quantInStock,
  discount,
}) {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.header}>
          <img
            className={styles.img}
            src={bookImg === null ? noImage : bookImg}
            alt=""
          />
          <div className={styles.info}>
            <div className={styles.text}>Id в системе: {id}</div>
            <div className={styles.text}>Название: {title}</div>
            <div className={styles.text}>Автор: {author}</div>
            <div className={styles.text}>Цена, рублей: {price}</div>
            <div className={styles.text}>Размер скидки, %: {discount}</div>
            <div className={styles.text}>Год издания: {year}</div>
            <div className={styles.text}>Языки: {language}</div>
            <div className={styles.text}>
              Количество страниц: {quantOfPages}
            </div>
            <div className={styles.text}>Вес, кг: {weight}</div>
            <div className={styles.text}>
              Количество на складе: {quantInStock}
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.title}>Описание:</div>
          <div className={styles.desc}>{description}</div>
        </div>
      </div>
    </>
  );
}

export default WhBookCard;
