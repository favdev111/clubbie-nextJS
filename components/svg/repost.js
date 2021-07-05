import styles from "./repost.module.css";

export default function Repost({ filled }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19.902"
      height="24.631"
      viewBox="0 0 19.902 24.631"
      fill={filled && "#5fc4ee"}
    >
      <defs></defs>
      <g
        className={styles.a}
        transform="translate(-2.2 0.131)"
        opacity={filled ? "1" : "0.5"}
      >
        <path
          className={styles.b}
          d="M17,1l4.067,4.067L17,9.134"
          transform="translate(0.235)"
          stroke={filled ? "#5fc4ee" : "#fff"}
        />
        <path
          className={styles.b}
          d="M3,11.1V9.067A4.067,4.067,0,0,1,7.067,5H21.3"
          transform="translate(0 0.067)"
          stroke={filled ? "#5fc4ee" : "#fff"}
        />
        <path
          className={styles.b}
          d="M7.067,23.134,3,19.067,7.067,15"
          transform="translate(0 0.235)"
          stroke={filled ? "#5fc4ee" : "#fff"}
        />
        <path
          className={styles.b}
          d="M21.3,13v2.034A4.067,4.067,0,0,1,17.235,19.1H3"
          transform="translate(0 0.201)"
          stroke={filled ? "#5fc4ee" : "#fff"}
        />
      </g>
    </svg>
  );
}
