import styles from "./ScrollToTopButton.module.css";
import arrow from "../../assets/svg/arrowUp.svg";
import { useState, useEffect } from "react";

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        onClick={scrollToTop}
        className={`${styles.main} ${
          isVisible ? styles.visible : styles.hidden
        }`}
      >
        <img className={styles.img} src={arrow} alt="" />
      </div>
    </>
  );
}

export default ScrollToTopButton;
