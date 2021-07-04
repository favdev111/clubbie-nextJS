import React from "react";
import styles from "./index.module.css";

function TeamCardForEvents({ data }) {
  const { title, crest } = data;
  return (
    <div className={styles.card}>
      <img src={crest} />
      <span>{title}</span>
    </div>
  );
}

export default TeamCardForEvents;
