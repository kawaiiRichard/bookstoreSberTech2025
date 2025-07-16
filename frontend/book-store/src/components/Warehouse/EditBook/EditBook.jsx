import styles from "./EditBook.module.css";
import Button from "../../Button/Button";
import InputData from "../../Employee/AddBook/InputData/InputData";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/books/${id}`, {
          withCredentials: true,
        });
        setFormData({
          title: res.data.title,
          author: res.data.author,
          weight: res.data.weight,
          description: res.data.description,
          language: res.data.language,
          year: res.data.year,
          quantOfPages: res.data.quantOfPages,
          quantInStock: res.data.quantInStock,
          price: res.data.price,
          discount: res.data.discount,
        });
      } catch (e) {
        setError("Ошибка при загрузке книги: ", e);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/update-book/${id}`,
        { withCredentials: true },
        formData
      );
      navigate("/warehouse");
    } catch (e) {
      setError("Ошибка при обновлении книги: ", e);
    }
  };

  if (loading) return <div>Загрузка данных книги...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className={styles.header}>
        <Link to="/warehouse">
          <div className={styles.link}>Вернуться обратно</div>
        </Link>
      </div>
      <div className={styles.main}>
        <div className={styles["add-book"]}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <InputData
              onChange={handleChange}
              type={"text"}
              name={"title"}
              placeholder={"Название"}
              value={formData.title}
            >
              Введите название книги
            </InputData>

            <InputData
              onChange={handleChange}
              type={"text"}
              name={"author"}
              placeholder={"Автор"}
              value={formData.author}
            >
              Введите автора книги
            </InputData>

            <InputData
              onChange={handleChange}
              type={"number"}
              name={"weight"}
              placeholder={"Вес, кг"}
              value={formData.weight}
            >
              Введите вес книги
            </InputData>

            <InputData
              onChange={handleChange}
              type={"text"}
              name={"language"}
              placeholder={"Языки"}
              value={formData.language}
            >
              Введите языки книги
            </InputData>

            <InputData
              onChange={handleChange}
              type={"number"}
              name={"year"}
              placeholder={"Год выпуска"}
              value={formData.year}
            >
              Введите год выпуска книги
            </InputData>

            <InputData
              onChange={handleChange}
              type={"number"}
              name={"quantOfPages"}
              placeholder={"Количество страниц"}
              value={formData.quantOfPages}
            >
              Введите количество страниц книги
            </InputData>

            <InputData
              onChange={handleChange}
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
                className={styles.textarea}
                name="description"
                placeholder={"Описание"}
                value={formData.description}
              />
            </div>
            <InputData
              onChange={handleChange}
              type={"number"}
              name={"price"}
              placeholder={"Цена"}
              value={formData.price}
            >
              Введите цену книги
            </InputData>
            <InputData
              onChange={handleChange}
              type={"number"}
              name={"discount"}
              placeholder={"Размер скидки, %"}
              value={formData.discount}
            >
              Введите размер скидки
            </InputData>
            <Button style={"buy"} type={"submit"}>
              Изменить книгу
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditBook;
