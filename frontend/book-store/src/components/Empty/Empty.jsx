import styles from "./Empty.module.css";
import bwBook from "../../assets/images/bw-book.jpg";
import { Link } from "react-router-dom";

function Empty({ children }) {
  return (
    <>
      <div className={styles.empty}>
        <div className="">
          <div className={styles.header}>{children}</div>
          <div className={styles.footer}>
            {"Добавьте что-нибудь из "}
            <Link to="/">
              <span className={styles["special-word"]}>каталога</span>
            </Link>
          </div>
        </div>
        <div className="">
          <img className={styles.img} src={bwBook} alt="" />
        </div>
      </div>
    </>
  );
}

export default Empty;
