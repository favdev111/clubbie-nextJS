import React from "react";
import styles from "./index.module.css";
import Date from "@svg/date";
import KickOff from "@svg/kickoff";
import Place from "@svg/place";

/* Not done yet */

function MatchInfo({ data }) {
  const { eventDateTime, kickoff, location } = data;
  return (
    <div className={styles.cardInfo}>
      <div className={styles.infoInner}>
        <Date />
        <p> {eventDateTime}</p>
      </div>
      <div className={styles.infoInner}>
        <KickOff />
        <p> {eventDateTime}</p>
      </div>
      <div className={styles.infoInner}>
        <Place />
        <p> {location}</p>
      </div>
    </div>
  );
}

export default MatchInfo;
