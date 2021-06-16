import React from "react";
import styles from "./index.module.css";

function MatchCard({ data }) {
  const { hometeam, awayteam } = data;
  return (
    <div className={styles.score}>
      <div className={styles.teamCard}>
        <img src={hometeam.src} />
        {hometeam.name}
      </div>

      {/* Middle */}
      <div className={styles.scoreMiddle}>
        <p className="opacity-50">Match</p>
        <h1>vs</h1>
      </div>

      {/* Away Team */}
      <div className={styles.teamCard}>
        <img src={awayteam.src} />
        {awayteam.name}
      </div>
    </div>
  );
}

export default MatchCard;
