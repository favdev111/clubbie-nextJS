import React from "react";
import cn from "classnames";
import Button from "@sub/button";
import ThreeDots from "@svg/threedots";
import DateSVG from "@svg/date";
import KickOffSVG from "@svg/kickoff";
import PlaceSVG from "@svg/place";
import styles from "./index.module.css";

function EventCardHeader({
  eventCoverImage,
  eventFee,
  eventCurrency,
  currencySymbolBeforeFee,
}) {
  return (
    <div className={styles.eventImageWrapper}>
      {eventCoverImage && <img src={eventCoverImage} />}
      {/* only if authoritarian role */}
      <div className={styles.eventManageOptionsWrapper}>
        <span>
          <ThreeDots />
        </span>
      </div>
      {/* only if fee */}
      <div className={styles.eventFee}>
        <span>
          {currencySymbolBeforeFee
            ? `${eventCurrency} ${eventFee}`
            : `${eventFee} ${eventCurrency}`}
        </span>
      </div>
    </div>
  );
}

function EventCardBody({
  eventType,
  eventTeams,
  eventDate,
  eventTime,
  eventLocation,
}) {
  return (
    <div className={styles.eventCardBody}>
      <div className={styles.eventTeamsWrapper}>
        <div className={styles.eventTeam}>
          <img src={eventTeams[0]?.crest} />
          <span>{eventTeams[0]?.title}</span>
        </div>
        <div className={styles.eventTypeWrapper}>
          <span
            className={cn(
              eventType?.toLowerCase() === "match" && styles.eventTypeMatch,
              eventType?.toLowerCase() === "training" &&
                styles.eventTypeTraining,
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
            <img src={eventTeams[1]?.crest} />
            <span>{eventTeams[1]?.title}</span>
          </div>
        )}
        {/* <p className="opacity-50 text-center"> Social </p> */}
      </div>
      <div className={styles.eventInfoWrapper}>
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
    </div>
  );
}

function EventCardActions() {
  return <Button className={styles.eventCardActionButton}>Available?</Button>;
}

function EventCard({
  eventId,
  eventType,
  eventTeams,
  eventStatus,
  eventLocation,
  eventDateTime,
  eventCoverImage,
  eventFee,
  eventCurrency,
  currencySymbolBeforeFee,
}) {
  return (
    <div key={eventId}>
      {/* <Link href={`/teamhub/events/${eventId}`}>
        <a> */}
      <div className={styles.eventCardWrapper}>
        <EventCardHeader
          eventFee={eventFee}
          eventCurrency={eventCurrency}
          eventCoverImage={eventCoverImage}
          currencySymbolBeforeFee={currencySymbolBeforeFee}
        />
        <EventCardBody
          eventType={eventType}
          eventTeams={eventTeams}
          eventDate={eventDateTime}
          eventTime={eventDateTime}
          eventLocation={eventLocation}
        />
        <EventCardActions />
      </div>
      {/* </a>
      </Link> */}
    </div>
  );
}

export default EventCard;
