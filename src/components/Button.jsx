import styles from "./Button.module.css";

const Button = ({ children, onCLick, type }) => {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onCLick}>
      {children}
    </button>
  );
};
export default Button;
