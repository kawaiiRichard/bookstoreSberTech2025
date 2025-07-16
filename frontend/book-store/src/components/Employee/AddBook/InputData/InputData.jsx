import styles from "./InputData.module.css";

function InputData({
  value,
  onChange,
  isValid,
  type,
  name,
  placeholder,
  children,
}) {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.text}>{children}</div>
        <input
          onChange={onChange}
          className={
            isValid ? `${styles.input} ${styles.inValid}` : styles.input
          }
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
        />
      </div>
    </>
  );
}

export default InputData;
