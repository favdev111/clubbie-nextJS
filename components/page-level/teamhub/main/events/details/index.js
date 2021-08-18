import React, { useState, useEffect } from "react";
import Link from "next/link";
import cn from "classnames";
import moment from "moment";
import Button from "@sub/button";
import ThreeDotsSVG from "@svg/threedots";
import DateSVG from "@svg/date";
import KickOffSVG from "@svg/kickoff";
import PlaceSVG from "@svg/place";
import AvailableSVG from "@svg/available";
import styles from "./index.module.css";

function EventCover({
  eventCoverImage,
  eventCurrency,
  eventFee,
  currencyBeforeFee,
}) {
  return (
    <div className={styles.eventCoverImageWrapper}>
      <img className={styles.eventCoverImage} src={eventCoverImage} />
      <span className={styles.eventManageOptionsWrapper}>
        <ThreeDotsSVG />
      </span>
      <span className={styles.eventFeeWrapper}>
        {currencyBeforeFee && `${eventCurrency} `}
        {eventFee}
        {!currencyBeforeFee && ` ${eventCurrency}`}
      </span>
    </div>
  );
}

function EventTeams({ eventType, eventTeams }) {
  return (
    <div className={styles.eventTeamsWrapper}>
      <div className={styles.eventTeam}>
        <Link href={`/teams/${eventTeams[0]?.id}`}>
          <a>
            <img className={styles.eventTeamCrest} src={eventTeams[0]?.crest} />
          </a>
        </Link>
        <Link href={`/teams/${eventTeams[0]?.id}`}>
          <a className={styles.eventTeamTitle}>
            <span>{eventTeams[0]?.title}</span>
          </a>
        </Link>
      </div>
      <div className={styles.eventTypeWrapper}>
        <span
          className={cn(
            eventType?.toLowerCase() === "match" && styles.eventTypeMatch,
            eventType?.toLowerCase() === "training" && styles.eventTypeTraining,
            eventType?.toLowerCase() === "social" && styles.eventTypeSocial
          )}
        >
          {eventType}
        </span>
        {eventType?.toLowerCase() === "match" && (
          <span className={styles.eventVerses}>VS</span>
        )}
      </div>
      {eventTeams?.length > 1 && (
        <div className={styles.eventTeam}>
          <Link href={`/teams/${eventTeams[1]?.id}`}>
            <a>
              <img
                className={styles.eventTeamCrest}
                src={eventTeams[1]?.crest}
              />
            </a>
          </Link>
          <Link href={`/teams/${eventTeams[1]?.id}`}>
            <a className={styles.eventTeamTitle}>
              <span>{eventTeams[1]?.title}</span>
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}

function EventInfo({
  eventType,
  eventTeams,
  eventDate,
  eventTime,
  eventLocation,
}) {
  return (
    <div className={styles.eventInfoWrapper}>
      <div className={styles.eventTeamsAndTypeWrapper}>
        <EventTeams eventType={eventType} eventTeams={eventTeams} />
      </div>
      <div className={styles.eventDateAndLocationWrapper}>
        {eventDate && (
          <span className={styles.eventInfoItem}>
            <DateSVG />
            <span>{eventDate}</span>
          </span>
        )}
        {eventTime && (
          <span className={styles.eventInfoItem}>
            <KickOffSVG /> <span>{eventTime} Kick-off</span>
          </span>
        )}
        {eventLocation && (
          <span className={styles.eventInfoItem}>
            <PlaceSVG /> <span>{eventLocation}</span>
          </span>
        )}
      </div>
      <Button className={styles.eventActionButton}>Available?</Button>
    </div>
  );
}

function EventPlayersList({ availablePlayers }) {
  console.log("availablePlayers => ", availablePlayers);
  return (
    <div className={styles.eventPlayersListWrapper}>
      <div className={styles.eventPlayersListHeader}>
        <AvailableSVG />
        <span>{availablePlayers?.length || 0} Players Available</span>
      </div>
      {availablePlayers?.length > 0 && (
        <div className={styles.eventPlayersList}>
          {availablePlayers?.map((player) => (
            <div className={styles.eventPlayerName}>
              <Link href={`/profile/${player?.id}`}>
                <a>{player?.name}</a>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EventDetails({ event }) {
  const [_event, setEvent] = useState({ ...event });

  useEffect(() => {
    setEvent({ ...event });
  }, []);

  return (
    <div className={styles.eventsWrapper}>
      <h1>{_event?.title}</h1>
      <EventCover
        eventFee={_event?.fee?.toFixed(2) || "0.00"}
        eventCurrency={_event?.currency || "£"}
        eventCoverImage={_event?.coverImage || "/assets/placeholder-event.png"}
        currencyBeforeFee={true}
      />
      <div className={styles.eventBodyWrapper}>
        <EventInfo
          eventType={_event?.eventType}
          eventTeams={_event?.teams?.map((x) => {
            return {
              id: x?.teamId?.id,
              title: x?.teamId?.title,
              crest: x?.teamId?.crest || "/assets/club-badge-placeholder.png",
            };
          })}
          eventDate={moment(_event?.eventDateTime).format("Do MMMM YYYY")}
          eventTime={moment(_event?.eventDateTime).format("h:mm A")}
          eventLocation={_event?.location}
          eventStatus={_event?.status}
        />
        <EventPlayersList
          availablePlayers={_event?.teams
            ?.map((x) => x?.attendees?.filter((y) => y?.available))
            ?.flat(1)
            ?.map((x) => {
              return {
                id: x?.user?.id,
                name: x?.user?.profile?.fullName || x?.user?.id,
              };
            })}
        />
      </div>
    </div>
  );
}

export default EventDetails;
