import React from "react";
import styles from "./index.module.css";
import Date from "@svg/date";
import KickOff from "@svg/kickoff";
import Place from "@svg/place";

function MatchInfo({ data }) {
  const { date, kickoff, place } = data;
  return (
    <div className={styles.cardInfo}>
      <div className={styles.infoInner}>
        <Date />
        <p> {date}</p>
      </div>
      <div className={styles.infoInner}>
        <KickOff />
        <p> {kickoff}</p>
      </div>
      <div className={styles.infoInner}>
        <Place />
        <p> {place}</p>
      </div>
    </div>
  );
}

export default MatchInfo;
