import React from "react";
import TeamCardForEvents from "@sub/event-teamcard";
import styles from "./index.module.css";

function LastResult({ data }) {
  const { homeTeam, awayTeam, score, scorers } = data;
  return (
    <div className={styles.lastResult}>
      <h3>Last Result</h3>
      <div className={styles.eventCard}>
        <div className={styles.inner}>
          {/* HomeTeam */}
          <TeamCardForEvents data={homeTeam} />

          {/* Result and details */}
          <div className={styles.score}>
            <h1>{score} </h1>
          </div>

          {/* AwayTeam */}
          <TeamCardForEvents data={awayTeam} />
        </div>
        <div className={styles.scorers}>
          <p className="opacity-50 text-center"> Goalscorers</p>
          <div className={styles.scorersInner}>
            {scorers.map((goal) => (
              <p key={goal.name + goal.min} className={styles.goal}>
                {goal.name} <span> '{goal.min} </span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LastResult;
