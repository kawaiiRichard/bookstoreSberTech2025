import styles from "./EditEmployee.module.css";

import { Link, useParams, useNavigate } from "react-router-dom";
import InputData from "../../../Employee/AddBook/InputData/InputData";
import Button from "../../../Button/Button";
import axios from "axios";
import { useState, useEffect } from "react";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    age: "",
    salary: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmp = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/admin/emps/get-emps/${id}`,
          { withCredentials: true }
        );
        setFormData({
          username: res.data.username,
          age: res.data.age,
          salary: res.data.salary,
          password: res.data.password,
        });
      } catch (e) {
        setError("Ошибка при загрузке сотрудника: ", e);
      } finally {
        setLoading(false);
      }
    };
    fetchEmp();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/admin/emps/update-emp/${id}`,
        { withCredentials: true },
        formData
      );
      navigate("/admin/employees");
    } catch (e) {
      setError("Ошибка при обновлении сотрудника: ", e);
    }
  };

  if (loading) return <div>Загрузка данных сотрудника...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className={styles.header}>
        <Link to="/admin/employees">
          <div className={styles.link}>Вернуться к сотрудникам</div>
        </Link>
      </div>
      <div className={styles.main}>
        <div className={styles["add-book"]}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <InputData
              onChange={handleChange}
              type={"text"}
              name={"username"}
              placeholder={"Имя"}
              value={formData.username}
            >
              Введите имя сотрудника
            </InputData>

            <InputData
              onChange={handleChange}
              type={"text"}
              name={"password"}
              placeholder={"Пароль"}
              value={formData.password}
            >
              Введите пароль сотрудника
            </InputData>

            <InputData
              onChange={handleChange}
              type={"number"}
              name={"age"}
              placeholder={"Возраст"}
              value={formData.age}
            >
              Введите возраст сотрудника
            </InputData>

            <InputData
              onChange={handleChange}
              type={"number"}
              name={"salary"}
              placeholder={"Зарплата"}
              value={formData.salary}
            >
              Введите зарплату сотрудника
            </InputData>

            <Button style={"buy"} type={"submit"}>
              Сохранить изменения
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditEmployee;
