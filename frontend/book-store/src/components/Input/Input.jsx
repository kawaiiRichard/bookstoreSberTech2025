import styles from "./Input.module.css";

function Input({ style, name, onChange, placeholder, value, type }) {
  return (
    <>
      <input
        onChange={onChange}
        value={value}
        className={`${styles.input} ${styles[`${style}`]}`}
        placeholder={placeholder}
        name={name}
        type={type}
      />
    </>
  );
}

export default Input;
