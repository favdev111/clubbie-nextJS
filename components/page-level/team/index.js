import React from "react";
import TeamDetails from "./details";
import styles from "./teams.module.css";

function Team({ team }) {
  return (
    <div className={styles.team}>
      <h1 className={styles.teamTitle}>Team</h1>
      <div className={styles.teamContent}>
        <TeamDetails team={team} />
      </div>
    </div>
  );
}

export default Team;
