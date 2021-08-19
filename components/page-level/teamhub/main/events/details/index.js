import React, { useState, useEffect } from "react";
import Link from "next/link";
import cn from "classnames";
import moment from "moment";
import Button from "@sub/button";
// import ThreeDotsSVG from "@svg/threedots";
import DateSVG from "@svg/date";
import KickOffSVG from "@svg/kickoff";
import PlaceSVG from "@svg/place";
import AvailableSVG from "@svg/available";
import eventTypes from "@utils/fixedValues/eventTypes";
import EventAvailabilityButton from "../common/button-availability";
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
      {/* <span className={styles.eventManageOptionsWrapper}>
        <ThreeDotsSVG />
      </span> */}
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
  eventId,
  eventType,
  eventTeams,
  eventDate,
  eventTime,
  eventLocation,
  actionButton,
  onAvailabilitySet,
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
      <EventAvailabilityButton
        eventId={eventId}
        buttonType={actionButton?.type}
        buttonText={actionButton?.text}
        disabled={actionButton?.disabled}
        className={styles.eventActionButton}
        onAvailabilitySet={onAvailabilitySet}
      />
    </div>
  );
}

function EventPlayersList({ availablePlayers }) {
  return (
    <div className={styles.eventPlayersListWrapper}>
      <div className={styles.eventPlayersListHeader}>
        <AvailableSVG />
        <span>
          {availablePlayers?.length > 0
            ? `${availablePlayers?.length} `
            : `No `}
          Player
          {availablePlayers?.length !== 1 && `s`} Available
        </span>
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

function EventDetails({ event, user }) {
  const [_event, setEvent] = useState({ ...event });
  const [_eventHomeTeam, setEventHomeTeam] = useState(null);
  const [_userAvailable, setUserAvailable] = useState(null);
  const [_availablePlayers, setAvailablePlayers] = useState([]);

  useEffect(() => {
    setEvent({ ...event });
    const homeTeam = (() => {
      const _temp = event?.teams?.find((x) =>
        x?.attendees?.find((a) => a?.user?.id === user?.id)
      );
      _temp.team = _temp?.teamId;
      delete _temp["teamId"];
      return _temp;
    })();
    setEventHomeTeam({ ...homeTeam });
    setUserAvailable(
      homeTeam?.attendees?.find((a) => a?.user?.id === user?.id)?.available
    );
    const availablePlayers = _event?.teams
      ?.map((x) => x?.attendees?.filter((y) => y?.available))
      ?.flat(1)
      ?.map((x) => {
        return {
          id: x?.user?.id,
          name: x?.user?.profile?.fullName || x?.user?.id,
        };
      });
    setAvailablePlayers([...availablePlayers]);
  }, []);

  const onAvailabilitySet = (available) => {
    if (_userAvailable && available) return;
    setUserAvailable(available);
    if (available) {
      setAvailablePlayers([
        ...[
          ..._availablePlayers,
          { id: user?.id, name: user?.profile?.fullName || user?.id },
        ],
      ]);
    } else {
      setAvailablePlayers(_availablePlayers.filter((x) => x?.id !== user?.id));
    }
  };

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
          eventId={_event?.id}
          eventType={_event?.eventType}
          eventTeams={_event?.teams?.map((x) => {
            return {
              id: x?.teamId?.id | x?.team?.id,
              title: x?.teamId?.title || x?.team?.title,
              crest:
                x?.teamId?.crest ||
                x?.team?.crest ||
                "/assets/club-badge-placeholder.png",
            };
          })}
          eventDate={moment(_event?.eventDateTime).format("Do MMMM YYYY")}
          eventTime={moment(_event?.eventDateTime).format("h:mm A")}
          eventLocation={_event?.location}
          actionButton={(() => {
            if (new Date(_event?.eventDateTime) < new Date()) {
              return {
                text: "Event Taken Place!",
                type: "cancel",
                disabled: true,
              };
            }
            if (
              _eventHomeTeam?.lineUpConfirmed &&
              _event?.eventType !== eventTypes.SOCIAL
            ) {
              return {
                text: "Line-up Confirmed",
                type: "info",
                disabled: true,
              };
            }
            if (_userAvailable === true) {
              return { text: "Available", type: "success" };
            }
            if (_userAvailable === false) {
              return { text: "Not Available", type: "danger" };
            }
            if (!_userAvailable) {
              return { text: "Available?", type: "info" };
            }
          })()}
          onAvailabilitySet={onAvailabilitySet}
        />
        <EventPlayersList availablePlayers={_availablePlayers} />
      </div>
    </div>
  );
}

export default EventDetails;
