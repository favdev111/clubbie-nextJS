import React from "react";
import styles from "./index.module.css";

function EventDetails({ data }) {
  const { date, kickoff, adress, state } = data;
  return (
    <div className={styles.details}>
      <p> {date}</p>
      <p> Kickoff at {kickoff}</p>
      <span className="opacity-50"> {adress} </span>
      <span className="opacity-50"> {state} </span>
    </div>
  );
}

export default EventDetails;
