import React from "react";
import TeamCardForEvents from "@sub/event-teamcard";
import styles from "./index.module.css";
import { DateTime } from "luxon";

function LastResult({ data }) {
  const { team1, team2, location, eventDateTime } = data;
  const lastResultDate = DateTime.fromISO(eventDateTime, { zone: "utc" });
  return (
    <div className={styles.lastResult}>
      <h3>Last Result</h3>
      <div className={styles.eventCard}>
        <div className={styles.inner}>
          {/* HomeTeam */}
          <TeamCardForEvents data={team1} />
          {/* Result and details */}
          <div className={styles.score}>
            <p className="text-center opacity-50"> {location}</p>
            <p className="text-center pt-10 pb-10">
              {lastResultDate.c.day}.{lastResultDate.c.month}.
              {lastResultDate.c.year} Kickoff at {lastResultDate.c.hour}:
              {lastResultDate.c.minute}
            </p>
            <h1>
              {team1.goals} : {team2.goals}
            </h1>
          </div>

          {/* AwayTeam */}
          <TeamCardForEvents data={team2} />
        </div>
        <div className={styles.scorers}>
          <p className="opacity-50 text-center"> Goalscorers</p>
          {/*           <div className={styles.scorersInner}>
            {scorers.map((goal) => (
              <p key={goal.name + goal.min} className={styles.goal}>
                {goal.name} <span> '{goal.min} </span>
              </p>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default LastResult;
