import styles from "./Register.module.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    repeatPassword: "",
    age: "",
  });

  const [errors, setErrors] = useState({
    username: false,
    password: false,
    repeatPassword: false,
    age: false,
  });

  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
    setPasswordMatchError(false);
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

    const passwordsDontMatch = formData.password !== formData.repeatPassword;
    if (passwordsDontMatch) {
      setPasswordMatchError(true);
      hasErrors = true;
    } else {
      setPasswordMatchError(false);
    }

    setErrors(newErrors);

    if (hasErrors) {
      return;
    }

    try {
      const payload = {
        username: formData.username,
        password: formData.password,
        age: Number(formData.age),
      };

      const response = await axios.post(
        "http://localhost:8080/auth/register",
        payload,
        { withCredentials: true }
      );

      console.log("Ответ сервера:", response.data);

      if (response.status === 200) {
        navigate("/login", {
          state: {
            registrationSuccess: true,
            username: formData.username,
          },
        });
      }
    } catch (e) {
      console.error("Ошибка при отправке данных: ", e);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.main}>
        <div className={styles.title}>Регистрация</div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.container}>
            <div className={styles.text}>Введите имя(логин)</div>
            <Input
              onChange={handleChange}
              type={"text"}
              name={"username"}
              value={formData.username}
              style={errors.username ? "inValid" : ""}
            />
          </div>
          <div className={styles.container}>
            <div className={styles.text}>Введите возраст</div>
            <Input
              onChange={handleChange}
              type={"number"}
              name={"age"}
              value={formData.age}
              style={errors.age ? "inValid" : ""}
            />
          </div>
          <div className={styles.container}>
            <div className={styles.text}>Введите пароль</div>
            <Input
              onChange={handleChange}
              type={"password"}
              name={"password"}
              value={formData.password}
              style={errors.password ? "inValid" : ""}
            />
          </div>
          <div className={styles.container}>
            <div className={styles.text}>Повторите пароль</div>
            <Input
              onChange={handleChange}
              type={"password"}
              name={"repeatPassword"}
              value={formData.repeatPassword}
              style={
                errors.repeatPassword || passwordMatchError ? "inValid" : ""
              }
            />
            {passwordMatchError && formData.repeatPassword.trim() && (
              <div className={styles.notCorrect}>Пароли не совпадают</div>
            )}
          </div>

          <Button style={"buy"} type={"submit"}>
            Зарегистрироваться
          </Button>

          <div className={styles["link-to"]}>
            <div className="">Есть аккаунт?</div>

            <div className={styles.link}>
              <Link to="/login">Войти</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
