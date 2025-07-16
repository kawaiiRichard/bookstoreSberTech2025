import styles from "./AddEmployee.module.css";
import Button from "../../../Button/Button";
import InputData from "../../../Employee/AddBook/InputData/InputData";

import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AddEmployee() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    salary: "",
    age: "",
  });

  const [errors, setErrors] = useState({
    username: false,
    password: false,
    salary: false,
    age: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: null,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasErrors = false;
    const newErrors = { ...errors };
    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = true;
        hasErrors = true;
      } else {
        newErrors[key] = false;
      }
    });

    setErrors(newErrors);

    if (hasErrors) {
      setSubmitStatus({
        success: false,
        message: "Пожалуйста, заполните все поля",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ success: null, message: "" });

    try {
      const payload = {
        username: formData.username,
        password: formData.password,
        age: Number(formData.age),
        salary: Number(formData.salary),
        role: "ROLE_EMPLOYEE",
      };

      const response = await axios.post(
        "http://localhost:8080/admin/emps/add-emp",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(formData);

      console.log("Ответ сервера:", response.data);

      if (response.status === 201) {
        const clearedForm = Object.keys(formData).reduce((acc, key) => {
          acc[key] = "";
          return acc;
        }, {});

        setFormData(clearedForm);
        setSubmitStatus({
          success: true,
          message: "Сотрудник успешно добавлен!",
        });
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      let errorMessage = "Произошла ошибка при добавлении сотрудника";

      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else {
          errorMessage = `Ошибка сервера: ${error.response.status}`;
        }
      } else if (error.request) {
        errorMessage = "Не удалось соединиться с сервером";
      }

      setSubmitStatus({ success: false, message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log(submitStatus.message);

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
              isValid={errors.username}
              type={"text"}
              name={"username"}
              placeholder={"Имя"}
              value={formData.username}
            >
              Введите имя сотрудника
            </InputData>

            <InputData
              onChange={handleChange}
              isValid={errors.password}
              type={"text"}
              name={"password"}
              placeholder={"Пароль"}
              value={formData.password}
            >
              Введите пароль сотрудника
            </InputData>

            <InputData
              onChange={handleChange}
              isValid={errors.age}
              type={"number"}
              name={"age"}
              placeholder={"Возраст"}
              value={formData.age}
            >
              Введите возраст сотрудника
            </InputData>

            <InputData
              onChange={handleChange}
              isValid={errors.salary}
              type={"number"}
              name={"salary"}
              placeholder={"Зарплата"}
              value={formData.salary}
            >
              Введите зарплату сотрудника
            </InputData>

            <Button style={"buy"} type={"submit"}>
              Добавить сотрудника
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddEmployee;
