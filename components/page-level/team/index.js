import React from "react";
import TeamDetails from "./details";
import TeamEdit from "./edit";
import styles from "./teams.module.css";

function Team({ team, user, editMode }) {
  return (
    <div className={styles.team}>
      <h1 className={styles.teamTitle}>Team</h1>
      <div className={styles.teamContent}>
        {!editMode && <TeamDetails team={team} user={user} />}
        {editMode && <TeamEdit team={team} user={user} />}
      </div>
    </div>
  );
}

export default Team;
