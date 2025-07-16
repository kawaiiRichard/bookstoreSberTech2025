import styles from "./AddedToWindow.module.css";

function AddedToWindow({ style, offset }) {
  const message =
    style === "cart" ? "Добавлено в корзину" : "Добавлено в избранное";

  return (
    <div
      className={`${styles[style]} ${styles.notification}`}
      style={{ "--offset": `${offset}px` }}
    >
      {message}
    </div>
  );
}

export default AddedToWindow;
