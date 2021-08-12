import React from "react";
import TeamCardForEvents from "@sub/event-teamcard";
import styles from "./index.module.css";

function StatisticResults({ data }) {
  return (
    <div className={styles.content}>
      {data.map((item) => (
        <div key={item + Math.random()}>
          <h3 className={styles.dayTitle}>{item.date}</h3>
          <div className={styles.dateSort}>
            {item.events.map((match) => (
              <div className={styles.sortInner}>
                <TeamCardForEvents data={match.hometeam} />
                <div className={styles.score}>
                  <p className="opacity-50 text-center"> vs </p>
                  <h1> {match.score} </h1>
                </div>
                <TeamCardForEvents data={match.awayteam} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatisticResults;
