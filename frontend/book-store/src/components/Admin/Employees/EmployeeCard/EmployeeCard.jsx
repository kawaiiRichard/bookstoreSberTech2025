import styles from "./EmployeeCard.module.css";

function EmployeeCard({ id, name, age, role, salary }) {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.text}>Id сотрудника: {id}</div>
        <div className={styles.text}>Имя: {name}</div>
        <div className={styles.text}>Возраст: {age}</div>
        <div className={styles.text}>Роль: {role}</div>
        <div className={styles.text}>Зарплата: {salary}</div>
      </div>
    </>
  );
}

export default EmployeeCard;
