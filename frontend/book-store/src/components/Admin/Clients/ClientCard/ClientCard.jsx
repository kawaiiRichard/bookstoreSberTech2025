import styles from "./ClientCard.module.css";

function ClientCard({ id, name, age, role }) {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.text}>Id клиента: {id}</div>
        <div className={styles.text}>Имя: {name}</div>
        <div className={styles.text}>Возраст: {age}</div>
        <div className={styles.text}>Роль: {role}</div>
      </div>
    </>
  );
}

export default ClientCard;
