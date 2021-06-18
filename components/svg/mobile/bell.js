import styles from "./bell.module.css";
export default function Bell() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20.351"
      height="21.4"
      viewBox="0 0 20.351 21.4"
    >
      <defs></defs>
      <g transform="translate(-2.3 -1.3)">
        <path
          className={styles.a}
          d="M18.792,8.317a6.317,6.317,0,1,0-12.634,0C6.158,15.687,3,17.792,3,17.792H21.951s-3.158-2.106-3.158-9.475"
          transform="translate(0)"
        />
        <path
          className={styles.a}
          d="M13.913,21a2.106,2.106,0,0,1-3.643,0"
          transform="translate(0.384 -0.049)"
        />
      </g>
    </svg>
  );
}
