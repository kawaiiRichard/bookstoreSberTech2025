import "./Button.css";

function Button({ type, style, children, onClick }) {
  return (
    <>
      <button type={type} onClick={onClick} className={`btn ${style}`}>
        {children}
      </button>
    </>
  );
}

export default Button;
