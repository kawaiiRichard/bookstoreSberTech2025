import styles from "./BookWindow.module.css";
import noImage from "../../../assets/svg/NoImage.svg";
import Advertising from "../../Advertising/Advertising";

import { useRef } from "react";

function BookWindow({
  title,
  author,
  bookImg,
  year,
  language,
  quantOfPages,
  weight,
  description,
}) {
  const descriptionRef = useRef(null);

  const scrollToDescription = () => {
    descriptionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  function trimToLastLetter(str, maxLength = 200) {
    let trimmedStr = str.substring(0, maxLength);
    if (trimmedStr.length < maxLength) {
      return trimmedStr;
    }
    const lastLetterIndex = trimmedStr.search(
      /[a-zA-Zа-яА-Я](?=[^a-zA-Zа-яА-Я]*$)/
    );
    if (lastLetterIndex !== -1) {
      trimmedStr = trimmedStr.substring(0, lastLetterIndex + 1);
    }

    return trimmedStr;
  }

  const annotation = trimToLastLetter(description, 200);

  return (
    <>
      <div className={styles["book-window"]}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          <div className={styles.author}>{author}</div>
        </div>

        <div className={styles.main}>
          <div className={styles["left-pannel "]}>
            <img
              className={styles.img}
              src={bookImg === null ? noImage : bookImg}
              alt=""
            />
          </div>
          <div className={styles["right-pannel"]}>
            <div className={styles["desc-cont"]}>
              <div className={styles.text}>
                <div className={styles["anno-title"]}>Аннотация</div>
              </div>
              <div className={styles.annotation}>
                {annotation}
                <span onClick={scrollToDescription} className={styles.ellipsis}>
                  ...
                </span>
              </div>
              <button onClick={scrollToDescription} className={styles.button}>
                Перейти к описанию
              </button>
            </div>

            <div className={styles.text}>
              Год издания:
              <div className={styles["special-text"]}>{year}</div>
            </div>
            <div className={styles.text}>
              Язык: <div className={styles["special-text"]}>{language}</div>
            </div>
            <div className={styles.text}>
              Страниц:
              <div className={styles["special-text"]}>{quantOfPages}</div>
            </div>
            <div className={styles.text}>
              Вес:
              <div className={styles["special-text"]}>{weight} кг</div>
            </div>
          </div>
        </div>

        <Advertising />

        <div className={styles.footer}>
          <div className={styles["desc-title"]}>Описание</div>
          <div className={styles.description} ref={descriptionRef}>
            {description}
          </div>
        </div>
      </div>
    </>
  );
}

export default BookWindow;
