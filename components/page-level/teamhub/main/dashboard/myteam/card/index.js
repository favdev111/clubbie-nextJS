import React from "react";
import styles from "./index.module.css";
import cn from "classnames";

function TeamCard({ index, data, active, setactive, teamRoles }) {
  return (
    <div
      onClick={() => setactive(index)}
      className={cn(styles.teamCard, active == index && styles.active)}
    >
      <img
        className={styles.cardImg}
        src={data?.crest || "/assets/club-badge-placeholder.png"}
      />
      <div className={styles.cardDetail}>
        <p className={styles.cardSpan}> {data.title} </p>
        <p className={styles.teamRole}>
          Logged in as
          <span className={styles.yellow}> {teamRoles[index]}</span>
        </p>
      </div>
    </div>
  );
}

export default TeamCard;
