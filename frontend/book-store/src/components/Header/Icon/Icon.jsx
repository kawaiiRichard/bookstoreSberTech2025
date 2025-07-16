import styles from "./Icon.module.css";

function Icon({ onMouseEnter, onMouseLeave, image, children }) {
  return (
    <>
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={styles.container}
      >
        <img className={styles.image} src={image} alt="" />
        <div className={styles.text}>{children}</div>
      </div>
    </>
  );
}

export default Icon;
