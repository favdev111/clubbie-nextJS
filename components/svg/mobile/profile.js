import styles from "./profile.module.css";

export default function Profile() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19.178"
      height="20.4"
      viewBox="0 0 19.178 20.4"
    >
      <defs></defs>
      <g transform="translate(-3.3 -2.3)">
        <path
          className={styles.a}
          d="M21.778,21.667V19.444A4.444,4.444,0,0,0,17.333,15H8.444A4.444,4.444,0,0,0,4,19.444v2.222"
          transform="translate(0 0.333)"
        />
        <circle
          className={styles.a}
          cx="4.5"
          cy="4.5"
          r="4.5"
          transform="translate(8 3)"
        />
      </g>
    </svg>
  );
}
