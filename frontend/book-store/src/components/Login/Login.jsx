import styles from "./Login.module.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    userType: "client",
  });
  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });
  const [authError, setAuthError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
    setAuthError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Отправляем данные на сервер:", formData);

    try {
      const endpoint =
        formData.userType === "employee"
          ? "http://localhost:8080/auth/employee/login"
          : "http://localhost:8080/auth/login";

      const response = await axios.post(
        endpoint,
        {
          username: formData.username,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );

      setUser(response.data);

      if (response.data.role.includes("ROLE_EMPLOYEE")) {
        navigate("/employee");
      } else {
        navigate("/");
      }

      console.log("Ответ с сервера: ", response.data);
    } catch (error) {
      console.error("Full error:", error);
      setAuthError("Неверный логин или пароль");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.main}>
        <div className={styles.title}>Вход</div>
        {authError && <div className={styles.error}>{authError}</div>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.userTypeSelector}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="userType"
                value="client"
                checked={formData.userType === "client"}
                onChange={handleChange}
              />
              Клиент
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="userType"
                value="employee"
                checked={formData.userType === "employee"}
                onChange={handleChange}
              />
              Сотрудник
            </label>
          </div>

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
            <div className={styles.text}>Введите пароль</div>
            <Input
              onChange={handleChange}
              type={"password"}
              name={"password"}
              value={formData.password}
              style={errors.password ? "inValid" : ""}
            />
          </div>
          <Button style={"buy"} type={"submit"}>
            Войти
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
