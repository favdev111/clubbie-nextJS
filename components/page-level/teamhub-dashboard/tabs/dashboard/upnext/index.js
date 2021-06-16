import React from "react";
import TeamCardForEvents from "@sub/event-teamcard";
import EventDetails from "./details";
import styles from "./index.module.css";

function UpNext({ data }) {
  const { homeTeam, awayTeam, eventDetails } = data;
  return (
    <div className={styles.upNext}>
      <h3> Up Next</h3>
      <div className={styles.card}>
        {/* Home Team */}
        <TeamCardForEvents data={homeTeam} />

        {/* Details */}
        <EventDetails data={eventDetails} />

        {/* Away Team */}
        <TeamCardForEvents data={awayTeam} />
      </div>
    </div>
  );
}

export default UpNext;
