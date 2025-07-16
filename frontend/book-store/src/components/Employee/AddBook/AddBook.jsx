import styles from "./AddBook.module.css";
import Button from "../../Button/Button";
import InputData from "./InputData/InputData";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function AddBook() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    weight: "",
    description: "",
    language: "",
    year: "",
    quantOfPages: "",
    quantInStock: "",
    price: "",
    discount: "",
  });

  const [errors, setErrors] = useState({
    title: false,
    author: false,
    weight: false,
    description: false,
    language: false,
    year: false,
    quantOfPages: false,
    quantInStock: false,
    price: false,
    discount: false,
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
      const response = await axios.post(
        "http://localhost:8080/employee/add-book",
        {
          ...formData,
          weight: parseFloat(formData.weight),
          year: parseInt(formData.year),
          quantOfPages: parseInt(formData.quantOfPages),
          quantInStock: parseInt(formData.quantInStock),
          price: parseFloat(formData.price),
        }
      );

      if (response.status === 200) {
        const clearedForm = Object.keys(formData).reduce((acc, key) => {
          acc[key] = "";
          return acc;
        }, {});

        setFormData(clearedForm);
        setSubmitStatus({ success: true, message: "Книга успешно добавлена!" });
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      let errorMessage = "Произошла ошибка при добавлении книги";

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

  return (
    <>
      <div className={styles.header}>
        <Link to="/employee">
          <div className={styles.link}>В сотрудника</div>
        </Link>
        <Link to="/admin">
          <div className={styles.link}>В админку</div>
        </Link>
      </div>
      <div className={styles.main}>
        <div className={styles["add-book"]}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <InputData
              onChange={handleChange}
              isValid={errors.title}
              type={"text"}
              name={"title"}
              placeholder={"Название"}
              value={formData.title}
            >
              Введите название книги
            </InputData>

            <InputData
              onChange={handleChange}
              isValid={errors.author}
              type={"text"}
              name={"author"}
              placeholder={"Автор"}
              value={formData.author}
            >
              Введите автора книги
            </InputData>

            <InputData
              onChange={handleChange}
              isValid={errors.weight}
              type={"number"}
              name={"weight"}
              placeholder={"Вес, кг"}
              value={formData.weight}
            >
              Введите вес книги
            </InputData>

            <InputData
              onChange={handleChange}
              isValid={errors.language}
              type={"text"}
              name={"language"}
              placeholder={"Языки"}
              value={formData.language}
            >
              Введите языки книги
            </InputData>

            <InputData
              onChange={handleChange}
              isValid={errors.year}
              type={"number"}
              name={"year"}
              placeholder={"Год выпуска"}
              value={formData.year}
            >
              Введите год выпуска книги
            </InputData>

            <InputData
              onChange={handleChange}
              isValid={errors.quantOfPages}
              type={"number"}
              name={"quantOfPages"}
              placeholder={"Количество страниц"}
              value={formData.quantOfPages}
            >
              Введите количество страниц книги
            </InputData>

            <InputData
              onChange={handleChange}
              isValid={errors.quantInStock}
              type={"number"}
              name={"quantInStock"}
              placeholder={"Количество на складе"}
              value={formData.quantInStock}
            >
              Количество книг на складе
            </InputData>

            <div className="">
              <div className={styles.text}>Введите описание книги</div>
              <textarea
                onChange={handleChange}
                className={
                  errors.description
                    ? `${styles.textarea} ${styles.inValid}`
                    : styles.textarea
                }
                name="description"
                placeholder={"Описание"}
                value={formData.description}
              />
            </div>
            <InputData
              onChange={handleChange}
              isValid={errors.price}
              type={"number"}
              name={"price"}
              placeholder={"Цена"}
              value={formData.price}
            >
              Введите цену книги
            </InputData>
            <InputData
              onChange={handleChange}
              isValid={errors.discount}
              type={"number"}
              name={"discount"}
              placeholder={"Размер скидки, %"}
              value={formData.discount}
            >
              Введите размер скидки
            </InputData>
            <Button style={"buy"} type={"submit"}>
              Добавить книгу
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddBook;
