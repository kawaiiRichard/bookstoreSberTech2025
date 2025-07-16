import "./Footer.css";

import VKIcon from "../../assets/svg/Vk.svg";
import TelegramIcon from "../../assets/svg/Telegram.svg";
import visaMono from "../../assets/svg/visaMono.svg";
import mirMono from "../../assets/svg/mirMono.svg";
import mastercardMono from "../../assets/svg/mastercardMono.svg";
import { useState } from "react";

function Footer() {
  const [showToast, setShowToast] = useState(false);

  const handleCopy = () => {
    const divText = document.getElementById("copyDiv").textContent;
    navigator.clipboard
      .writeText(divText)
      .then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
      })
      .catch((err) => console.error("Ошибка копирования:", err));
  };

  return (
    <>
      <div className="footer">
        <div className="footer-top">
          <div onClick={handleCopy} id="copyDiv" className="text phone-number">
            8 888 888-88-88
          </div>
          <div className="text">Круглосуточно</div>
          <div className="footer-top-icons">
            <img className="icon" src={VKIcon} alt="" />
            <img className="icon" src={TelegramIcon} alt="" />
          </div>
        </div>
        <div className="footer-bottom">
          <div className="text bot">2007-2025, ООО "Свежие Книги"</div>
          <div className="access-to-pay">
            <div className="text">Принимаем к оплате</div>
            <img src={mirMono} alt="" className="icon" />
            <img src={mastercardMono} alt="" className="icon" />
            <img src={visaMono} alt="" className="icon" />
          </div>
        </div>
      </div>
      {showToast && (
        <div className="toast-notification">
          Номер скопирован: 8 888 888-88-88
        </div>
      )}
    </>
  );
}

export default Footer;
