import styles from "./Clients.module.css";
import ClientCard from "./ClientCard/ClientCard";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";

function Clients() {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/admin/get-clients",
          { withCredentials: true }
        );
        const filteredClients = response.data.filter(
          (client) => client.role === "ROLE_CLIENT"
        );
        setClients(filteredClients);
        setError(null);
      } catch (err) {
        console.log(err);
        setError("Ошибка при загрузке клиентов");
        setClients([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className={styles.header}>
        <Link to="/admin">
          <div className={styles.link}>Вернуться в админку</div>
        </Link>
      </div>
      <div className={styles.main}>
        <h1>Список клиентов</h1>
        {clients.map((item) => (
          <div className={styles.client} key={item.id}>
            <ClientCard
              id={item.id}
              name={item.username}
              age={item.age}
              role={item.role}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Clients;
