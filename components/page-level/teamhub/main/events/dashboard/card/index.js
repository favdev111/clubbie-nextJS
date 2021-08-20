import React from "react";
import Link from "next/link";
import cn from "classnames";
import moment from "moment";
// import ThreeDots from "@svg/threedots";
import DateSVG from "@svg/date";
import KickOffSVG from "@svg/kickoff";
import PlaceSVG from "@svg/place";
import eventTypes from "@utils/fixedValues/eventTypes";
import eventStatusTypes from "@utils/fixedValues/eventStatusTypes";
import EventAvailabilityButton from "../../common/button-availability";
import styles from "./index.module.css";

function EventCardHeader({
  eventId,
  eventCoverImage,
  eventFee,
  eventCurrency,
  currencySymbolBeforeFee,
}) {
  return (
    <div className={styles.eventImageWrapper}>
      <Link href={`/teamhub/events/${eventId}`}>
        <a>{eventCoverImage && <img src={eventCoverImage} />}</a>
      </Link>
      {/* only if authoritarian role */}
      {/* <div className={styles.eventManageOptionsWrapper}>
        <span>
          <ThreeDots />
        </span>
      </div> */}
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
          <Link href={`/teams/${eventTeams[0]?.id}`}>
            <a>
              <img
                className={styles.eventTeamCrest}
                src={eventTeams[0]?.crest}
              />
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

function EventCardActions({ actionButton, eventId }) {
  return (
    <EventAvailabilityButton
      eventId={eventId}
      buttonType={actionButton?.type}
      buttonText={actionButton?.text}
      disabled={actionButton?.disabled}
      className={styles.eventCardActionButton}
    />
  );
}

function EventCard({
  eventId,
  eventType,
  eventStatus,
  eventHomeTeamLineUpConfirmed,
  eventTeams,
  eventLocation,
  eventDateTime,
  eventCoverImage,
  eventFee,
  eventCurrency,
  currencySymbolBeforeFee,
  userAvailable,
}) {
  return (
    <div key={eventId}>
      <div className={styles.eventCardWrapper}>
        <EventCardHeader
          eventId={eventId}
          eventFee={eventFee}
          eventCurrency={eventCurrency}
          eventCoverImage={eventCoverImage}
          currencySymbolBeforeFee={currencySymbolBeforeFee}
        />
        <EventCardBody
          eventType={eventType}
          eventTeams={eventTeams}
          eventDate={moment(eventDateTime).format("Do MMMM YYYY")}
          eventTime={moment(eventDateTime).format("h:mm A")}
          eventLocation={eventLocation}
        />
        <EventCardActions
          eventId={eventId}
          actionButton={(() => {
            if (eventStatus === eventStatusTypes?.CANCELED) {
              return {
                text: "Event Canceled!",
                type: "danger",
                disabled: true,
              };
            }
            if (new Date(eventDateTime) < new Date()) {
              return {
                text: "Event Taken Place!",
                type: "cancel",
                disabled: true,
              };
            }
            if (
              eventHomeTeamLineUpConfirmed &&
              eventType !== eventTypes.SOCIAL
            ) {
              return {
                text: "Line-up Confirmed",
                type: "info",
                disabled: true,
              };
            }
            if (userAvailable === true) {
              return { text: "Available", type: "success" };
            }
            if (userAvailable === false) {
              return { text: "Not Available", type: "danger" };
            }
            if (!userAvailable) {
              return { text: "Available?", type: "info" };
            }
          })()}
        />
      </div>
    </div>
  );
}

export default EventCard;
