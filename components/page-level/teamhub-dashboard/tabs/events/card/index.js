import React, { useEffect } from "react";
import styles from "./index.module.css";
import cn from "classnames";
import Link from "next/link";
/* Svg */
import ThreeDots from "@svg/threedots";

/* Sub */
import MatchCard from "@sub/match-card";
import MatchInfo from "@sub/match-info";

function EventCard({ data, user, activeTeam }) {
  const { id, location, eventDateTime, teams, eventType } = data;
  const userRole = user.teams[activeTeam].role;
  return (
    <Link href={`/teamhub/event/${id}`}>
      <div className={styles.card}>
        {/* Card upper *--* Image side */}
        <div className={styles.cardImg}>
          {data.coverImage && <img src={data?.coverImage} />}
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
          {eventType == "match" && (
            <MatchCard user={user} activeTeam={activeTeam} eventId={id} />
          )}

          {eventType == "social" && <div> Social </div>}
          {/* Info */}
          <MatchInfo data={{ eventDateTime, eventDateTime, location }} />
          {/* Avaibility */}
          <div
            className={cn(
              styles.availableCard,
              userRole == "teamLead" &&
                data?.status !== "published" &&
                styles.unavailable,
              userRole == "player" &&
                data?.eventType != "match" &&
                data?.teams[0].attendees.filter((i) => i.user == user.id)
                  .length < 1 &&
                styles.unavailable
            )}
          >
            {/* Teamleader */}
            {userRole == "teamLead" &&
              data?.status == "published" &&
              "Published"}
            {userRole == "teamLead" && data?.status == "draft" && "Draft"}
            {userRole == "teamLead" && data?.status == "canceled" && "Canceled"}

            {/* Player */}
            {data?.eventType != "match" && userRole == "player"
              ? data?.teams[0].attendees.filter((i) => i.user == user.id)
                  .length < 1
                ? "Unavailable"
                : "Available"
              : null}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;
