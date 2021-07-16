export default function Upload({ strokeColor }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17.4"
      height="19.4"
      viewBox="0 0 17.4 19.4"
    >
      <g id="share" transform="translate(0.7 0.7)">
        <path
          id="Path_2212"
          data-name="Path 2212"
          d="M4,12v8a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V12"
          transform="translate(-4 -4)"
          fill="none"
          stroke={strokeColor || "#5fc4ee"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.4"
        />
        <path
          id="Path_2213"
          data-name="Path 2213"
          d="M16,6,12,2,8,6"
          transform="translate(-4 -2)"
          fill="none"
          stroke={strokeColor || "#5fc4ee"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.4"
        />
        <line
          id="Line_36"
          data-name="Line 36"
          y2="13"
          transform="translate(8)"
          fill="none"
          stroke={strokeColor || "#5fc4ee"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.4"
        />
      </g>
    </svg>
  );
}
