import React from "react";
import ClubDetails from "./details";
import styles from "./clubs.module.css";

function Club({ club }) {
  return (
    <div className={styles.club}>
      <h1 className={styles.clubTitle}>Club</h1>
      <div className={styles.clubContent}>
        <ClubDetails club={club} />
      </div>
    </div>
  );
}

export default Club;
