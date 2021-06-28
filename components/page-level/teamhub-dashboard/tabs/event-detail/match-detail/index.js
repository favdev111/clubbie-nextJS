import React from "react";
import styles from "./index.module.css";
import { DateTime } from "luxon";
import Date from "@svg/date";
import KickOff from "@svg/kickoff";
import Place from "@svg/place";

function MatchDetail({ data }) {
  return (
    <div className={styles.matchDetail}>
      <div className={styles.score}>
        <div className={styles.teamCard}>
          <img src={data.teams[0].teamId.crest} />

          {data.teams[0].teamId.title}
        </div>

        {/* Middle */}
        <div className={styles.scoreMiddle}>
          <p className="opacity-50">Match</p>
          <h1>vs</h1>
        </div>

        {/* Away Team */}
        <div className={styles.teamCard}>
          <img src={data.teams[1].teamId.crest} />

          {data.teams[1].teamId.title}
        </div>
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.infoInner}>
          <Date />
          <p>
            {DateTime.fromISO(data.eventDateTime, { zone: "utc" }).day}{" "}
            {DateTime.fromISO(data.eventDateTime, { zone: "utc" }).monthShort}{" "}
            {DateTime.fromISO(data.eventDateTime, { zone: "utc" }).year}{" "}
          </p>
        </div>
        <div className={styles.infoInner}>
          <KickOff />
          <p>
            {DateTime.fromISO(data.eventDateTime, { zone: "utc" }).hour}:
            {DateTime.fromISO(data.eventDateTime, { zone: "utc" }).minute}{" "}
            Kick-off
          </p>
        </div>
        <div className={styles.infoInner}>
          <Place />
          <p> {data.location}</p>
        </div>
      </div>
    </div>
  );
}

export default MatchDetail;
