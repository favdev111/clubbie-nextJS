import React from "react";
import styles from "./index.module.css";
import Available from "@svg/available";

function AvailablePlayers() {
  const players = ["James Brown", "Tom Ford"];
  return (
    <div className={styles.available}>
      <div className={styles.header}>
        <Available />
        <p>
          <span>2</span> Players Available
        </p>
      </div>
      <div className={styles.players}>
        {players.map((player) => (
          <p key={player + Math.random()}>{player}</p>
        ))}
      </div>
    </div>
  );
}

export default AvailablePlayers;
