import React from "react";
import ClubDetails from "./details";
import ClubEdit from "./edit";
import styles from "./clubs.module.css";

function Club({ user, club, editMode }) {
  return (
    <div className={styles.club}>
      <h1 className={styles.clubTitle}>Club</h1>
      <div className={styles.clubContent}>
        {!editMode && <ClubDetails club={club} user={user} />}
        {editMode && <ClubEdit club={club} />}
      </div>
    </div>
  );
}

export default Club;
