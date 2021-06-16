import React from "react";
import styles from "./index.module.css";
import cn from "classnames";
/* Svg */
import Date from "@svg/date";
import KickOff from "@svg/kickoff";
import Place from "@svg/place";
import ThreeDots from "@svg/threedots";

/* Sub */
import MatchCard from "@sub/match-card";
import MatchInfo from "@sub/match-info";

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
        <MatchCard data={{ hometeam, awayteam }} />

        {/* Info */}

        <MatchInfo data={{ date, kickoff, place }} />

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
