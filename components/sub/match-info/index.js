import React from "react";
import styles from "./index.module.css";
import Date from "@svg/date";
import KickOff from "@svg/kickoff";
import Place from "@svg/place";

/* Not done yet */
import { DateTime } from "luxon";

function MatchInfo({ data }) {
  const { eventDateTime, kickoff, location } = data;

  return (
    <div className={styles.cardInfo}>
      <div className={styles.infoInner}>
        <Date />
        <p>
          {DateTime.fromISO(eventDateTime, { zone: "utc" }).day}{" "}
          {DateTime.fromISO(eventDateTime, { zone: "utc" }).monthShort}{" "}
          {DateTime.fromISO(eventDateTime, { zone: "utc" }).year}{" "}
        </p>
      </div>
      <div className={styles.infoInner}>
        <KickOff />
        <p>
          {DateTime.fromISO(eventDateTime, { zone: "utc" }).hour}:
          {DateTime.fromISO(eventDateTime, { zone: "utc" }).minute} Kick-off
        </p>
      </div>
      <div className={styles.infoInner}>
        <Place />
        <p> {location}</p>
      </div>
    </div>
  );
}

export default MatchInfo;
