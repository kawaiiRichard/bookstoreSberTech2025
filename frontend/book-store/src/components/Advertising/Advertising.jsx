import styles from "./Advertising.module.css";

import bwBook from "../../assets/images/bw-book.jpg";

function Advertising() {
  return (
    <>
      <div className={styles.advertising}>
        <div className={styles.text}>
          {"От наших книг всегда много толка - это книжная полка!"}
        </div>
        <img className={styles.img} src={bwBook} alt="" />
      </div>
    </>
  );
}

export default Advertising;
