export default function Fav({ strokeColor }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17.486"
      height="15.431"
      viewBox="0 0 17.486 15.431"
    >
      <path
        id="heart_3_"
        data-name="heart (3)"
        d="M16.395,4.239a4.233,4.233,0,0,0-5.987,0l-.816.816-.816-.816a4.234,4.234,0,1,0-5.987,5.987l.816.816,5.987,5.987,5.987-5.987.816-.816a4.233,4.233,0,0,0,0-5.987Z"
        transform="translate(-0.849 -2.298)"
        fill="none"
        stroke={strokeColor || "#5fc4ee"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}
