import styles from "./plus.module.css";
export default function Plus() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21.4"
      height="21.4"
      viewBox="0 0 21.4 21.4"
    >
      <defs></defs>
      <g transform="translate(-1.3 -1.3)">
        <circle
          className={styles.a}
          cx="10"
          cy="10"
          r="10"
          transform="translate(2 2)"
        />
        <line className={styles.a} y2="8" transform="translate(12 8)" />
        <line className={styles.a} x2="8" transform="translate(8 12)" />
      </g>
    </svg>
  );
}
