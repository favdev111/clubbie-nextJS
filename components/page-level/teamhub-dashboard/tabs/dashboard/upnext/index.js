import React from "react";
import TeamCardForEvents from "@sub/event-teamcard";
import EventDetails from "./details";
import styles from "./index.module.css";

function UpNext({ data }) {
  return (
    <div className={styles.upNext}>
      <h3> Up Next</h3>
      <div className={styles.card}>
        {/* Home Team */}
        <TeamCardForEvents data={data[0].teams.team1} />

        {/* Details */}
        <EventDetails data={data[0]} />

        {/* Away Team */}
        <TeamCardForEvents data={data[0].teams.team2} />
      </div>
    </div>
  );
}

export default UpNext;
