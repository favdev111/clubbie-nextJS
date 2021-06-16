import React from "react";
import styles from "./index.module.css";
import DetailCover from "./cover";
import MatchDetail from "./match-detail";
import AvailablePlayers from "./players";

function EventDetail() {
  return (
    <div className={styles.eventDetail}>
      <h1>Events</h1>
      <DetailCover />
      <div className={styles.twoRows}>
        <MatchDetail />
        <AvailablePlayers />
      </div>
    </div>
  );
}

export default EventDetail;
