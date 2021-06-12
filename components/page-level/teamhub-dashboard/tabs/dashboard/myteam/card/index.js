import React from "react";
import styles from "./index.module.css";
import cn from "classnames";

function TeamCard({ data }) {
  const { src, name, active } = data;
  return (
    <div className={cn(styles.teamCards, active && styles.active)}>
      <img className={styles.cardImg} src={src} />
      <div className={styles.cardDetail}>
        <p className={styles.cardSpan}> {name} </p>
        <p> Logged in as Player</p>
      </div>
    </div>
  );
}

export default TeamCard;
