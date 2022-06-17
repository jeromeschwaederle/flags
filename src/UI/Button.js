import styles from "./Button.module.css";

export default function Button({ className, onClick, text }) {
  return (
    <button className={`${styles.btn} ${className}`} onClick={onClick}>
      <span>{text}</span>
    </button>
  );
}
