export default function Comment({ strokeColor }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16.348"
      height="16.348"
      viewBox="0 0 16.348 16.348"
    >
      <path
        id="message-square"
        d="M17.948,12.965a1.661,1.661,0,0,1-1.661,1.661H6.322L3,17.948V4.661A1.661,1.661,0,0,1,4.661,3H16.287a1.661,1.661,0,0,1,1.661,1.661Z"
        transform="translate(-2.3 -2.3)"
        fill="none"
        stroke={strokeColor || "#5fc4ee"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}
