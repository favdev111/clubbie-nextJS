import React from "react";
import { DateTime } from "luxon";
import Date from "@svg/date";
import KickOff from "@svg/kickoff";
import Place from "@svg/place";
import Comment from "@svg/social/comment";
import styles from "./index.module.css";

function SocialDetail({ data }) {
  return (
    <div className={styles.matchDetail}>
      <div className={styles.score}>
        <div className={styles.teamCard}>
          {data && <img src={data.teams[0].teamId.crest} />}

          {data && data?.teams[0].teamId.title}
        </div>
        {/* Middle */}
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

        <div className={styles.infoInner}>
          <Comment />
          <p> {data?.message}</p>
        </div>
      </div>
    </div>
  );
}

export default SocialDetail;
