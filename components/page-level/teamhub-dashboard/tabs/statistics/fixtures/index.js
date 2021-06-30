import React from "react";
import styles from "./index.module.css";
import TeamCardForEvents from "@sub/event-teamcard";
import EventDetails from "../../dashboard/upnext/details";

function StatisticFixtures({ data }) {
  return (
    <div>
      {data.map((item, index) => (
        <span key={index}>
          <h3> {item.eventDetails.date}</h3>
          <div className={styles.card}>
            {/* Home Team */}
            <TeamCardForEvents data={item.homeTeam} />

            {/* Details */}
            <EventDetails data={item.eventDetails} />

            {/* Away Team */}
            <TeamCardForEvents data={item.awayTeam} />
          </div>
        </span>
      ))}
    </div>
  );
}

export default StatisticFixtures;
