import React from "react";
import styles from "./index.module.css";
import cn from "classnames";
/* Svg */
import Date from "@svg/date";
import KickOff from "@svg/kickoff";
import Place from "@svg/place";
import ThreeDots from "@svg/threedots";

function EventCard({ data }) {
  const {
    src,
    hometeam,
    awayteam,
    date,
    kickoff,
    place,
    available,
    price,
  } = data;
  return (
    <div className={styles.card}>
      {/* Card upper *--* Image side */}
      <div className={styles.cardImg}>
        <img src={src} />
        <div className={styles.price}>
          <p> £{price} </p>
        </div>
        <div className={styles.more}>
          <ThreeDots />
        </div>
      </div>

      {/* Card lower *--* Below image */}

      <div className={styles.cardDetail}>
        {/* Home team */}
        <div className={styles.score}>
          <div className={styles.teamCard}>
            <img src={hometeam.src} />
            {hometeam.name}
          </div>

          {/* Middle */}
          <div className={styles.scoreMiddle}>
            <p className="opacity-50">Match</p>
            <h1>vs</h1>
          </div>

          {/* Away Team */}
          <div className={styles.teamCard}>
            <img src={awayteam.src} />
            {awayteam.name}
          </div>
        </div>

        {/* Info */}
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

        {/* Avaibility */}
        <div
          className={cn(styles.availableCard, !available && styles.unavailable)}
        >
          {available ? "Available?" : "Not available"}
        </div>
      </div>
    </div>
  );
}

export default EventCard;
