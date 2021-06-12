import React from "react";
import styles from "./index.module.css";

function TeamCardForEvents({ data }) {
  const { name, src } = data;
  return (
    <div className={styles.card}>
      <img src={src} />
      <span>{name}</span>
    </div>
  );
}

export default TeamCardForEvents;
