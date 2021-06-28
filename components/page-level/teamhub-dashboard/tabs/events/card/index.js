import React from "react";
import styles from "./index.module.css";
import cn from "classnames";
import Link from "next/link";
/* Svg */
import ThreeDots from "@svg/threedots";

/* Sub */
import MatchCard from "@sub/match-card";
import MatchInfo from "@sub/match-info";

function EventCard({ available, data, user }) {
  const { id, location, eventDateTime, teams, eventType } = data;

  /* Not done yet */
  return (
    <Link href={`/teamhub/event/${id}`}>
      <div className={styles.card}>
        {/* Card upper *--* Image side */}
        <div className={styles.cardImg}>
          <img src={data?.coverImage} />
          <div className={styles.price}>
            <p> £ </p>
          </div>
          <div className={styles.more}>
            <ThreeDots />
          </div>
        </div>

        {/* Card lower *--* Below image */}

        <div className={styles.cardDetail}>
          {/* Event Type  */}
          {eventType == "match" && <MatchCard user={user} data={teams} />}
          {eventType == "social" && <div> Social </div>}

          {/* Info */}

          <MatchInfo data={{ eventDateTime, eventDateTime, location }} />

          {/* Avaibility */}
          <div
            className={cn(
              styles.availableCard,
              !available && styles.unavailable
            )}
          >
            {available ? "Available?" : "Not available"}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;
