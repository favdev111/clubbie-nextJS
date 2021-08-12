import React from "react";
import { DateTime } from "luxon";
import Date from "@svg/date";
import KickOff from "@svg/kickoff";
import Available from "@svg/available";
import Place from "@svg/place";
import styles from "./index.module.css";

function MatchDetail({ data, players, userRole }) {
  return (
    <div className={styles.matchDetail}>
      <div className={styles.score}>
        <div className={styles.teamCard}>
          {data && <img src={data.teams[0].teamId.crest} />}

          {data && data?.teams[0].teamId.title}
        </div>

        {/* Middle */}
        <div className={styles.scoreMiddle}>
          <p className="opacity-50">Match</p>
          <h1>vs</h1>
        </div>

        {/* Away Team */}
        <div className={styles.teamCard}>
          {data && <img src={data?.teams[1].teamId.crest} />}

          {data && data?.teams[1].teamId.title}
        </div>
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.infoInner}>
          <Date />
          <p>
            {DateTime.fromISO(data?.eventDateTime, { zone: "utc" }).day}{" "}
            {DateTime.fromISO(data?.eventDateTime, { zone: "utc" }).monthShort}{" "}
            {DateTime.fromISO(data?.eventDateTime, { zone: "utc" }).year}{" "}
          </p>
        </div>
        <div className={styles.infoInner}>
          <KickOff />
          <p>
            {DateTime.fromISO(data?.eventDateTime, { zone: "utc" }).hour}:
            {DateTime.fromISO(data?.eventDateTime, { zone: "utc" }).minute}{" "}
            Kick-off
          </p>
        </div>
        <div className={styles.infoInner}>
          <Place />
          <p> {data?.location}</p>
        </div>
        {userRole == "teamLead" && (
          <div className={styles.infoInner}>
            <Available />
            <p> {players?.length} players available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MatchDetail;
