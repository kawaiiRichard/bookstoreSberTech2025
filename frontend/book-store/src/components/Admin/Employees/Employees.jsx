import styles from "./Employees.module.css";
import EmployeeCard from "./EmployeeCard/EmployeeCard";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Employees() {
  const navigate = useNavigate();
  const [emps, setEmps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleClick = () => {
    navigate("/admin/employees/add-employee");
  };

  useEffect(() => {
    const fetchEmps = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/admin/emps/get-emps",
          { withCredentials: true }
        );
        console.log(response.data);
        setEmps(response.data);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmps();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/admin/emps/delete-emp/${id}`);
      setEmps((prevEmps) => prevEmps.filter((emp) => emp.id !== id));
    } catch (e) {
      console.error("ошибка при удалении сотрудника: ", e);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/employees/edit/${id}`);
  };

  if (loading) return <div>Загрузка сотрудников...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <>
      <div className={styles.header}>
        <Link to="/admin">
          <div className={styles.link}>Вернуться в админку</div>
        </Link>
      </div>
      <div className={styles.main}>
        <button onClick={handleClick} className={styles["add-employee"]}>
          Добавить сотрудника
        </button>
        <h1>Список сотрудников</h1>
        {emps.map((item) => (
          <div className={styles.employee} key={item.id}>
            <EmployeeCard
              id={item.id}
              name={item.username}
              age={item.age}
              role={item.role}
              salary={item.salary}
            />
            <div className={styles.btns}>
              <button
                className={styles.btn}
                onClick={() => handleEdit(item.id)}
              >
                Изменить
              </button>
              <button
                className={styles.btn}
                onClick={() => handleDelete(item.id)}
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Employees;
