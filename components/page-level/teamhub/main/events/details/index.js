import React, { useState, useEffect } from "react";
import Link from "next/link";
import cn from "classnames";
import moment from "moment";
import Button from "@sub/button";
import useNotifications from "@sub/hook-notification";
import ConfirmDialog from "@sub/confirm-dialog";
import BackDropLoader from "@sub/backdrop-loader";
// import ThreeDotsSVG from "@svg/threedots";
import DateSVG from "@svg/date";
import KickOffSVG from "@svg/kickoff";
import PlaceSVG from "@svg/place";
import AvailableSVG from "@svg/available";
import EditEventSVG from "@svg/edit-event";
import ConfirmLineupSVG from "@svg/confirm-lineup";
import CancelEventSVG from "@svg/cancel-event";
import RightArrowSVG from "@svg/right-arrow";
import Events from "@api/services/Events";
import eventTypes from "@utils/fixedValues/eventTypes";
import eventStatusTypes from "@utils/fixedValues/eventStatusTypes";
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

function EventOptionButtons({
  eventId,
  hasLineup,
  showManageButton,
  manageMode,
  setManageMode,
}) {
  return hasLineup || showManageButton ? (
    <div className={styles.eventManageOptionButtonsWrapper}>
      {hasLineup && !manageMode && (
        <Link href={`/teamhub/events/${eventId}/lineup`}>
          <a>
            <Button
              size="medium"
              variant="info"
              className={styles.eventLineupButton}
            >
              View Lineup
            </Button>
          </a>
        </Link>
      )}
      {showManageButton && (
        <Button
          size="medium"
          variant={!manageMode ? "cancel" : "success"}
          onClick={() => setManageMode((mode) => !mode)}
        >
          {!manageMode ? "Manage" : "Done"}
        </Button>
      )}
    </div>
  ) : (
    <></>
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
  manageMode,
  totalAvailablePlayers,
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
        {manageMode && (
          <div className={styles.eventPlayersListHeader}>
            <AvailableSVG />
            <span>
              {totalAvailablePlayers > 0 ? `${totalAvailablePlayers} ` : `No `}
              Player
              {totalAvailablePlayers !== 1 && `s`} Available
            </span>
          </div>
        )}
      </div>
      {!manageMode && (
        <EventAvailabilityButton
          eventId={eventId}
          buttonType={actionButton?.type}
          buttonText={actionButton?.text}
          disabled={actionButton?.disabled}
          className={styles.eventActionButton}
          onAvailabilitySet={onAvailabilitySet}
        />
      )}
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

function EventManageOptions({
  eventId,
  eventType,
  isEventCancelable,
  onEventCancel,
}) {
  const [loading, setLoading] = useState(false);
  const [confirmCancelEvent, setConfirmCancelEvent] = useState(false);
  const { showNotificationMsg } = useNotifications();

  const cancelEvent = async () => {
    setLoading(true);

    // api call
    const response = await Events.CancelEventbyId(eventId).catch((e) => {
      console.log("err => ", e?.response);
      return null;
    });

    // error
    if (!response) {
      showNotificationMsg("Could Not Cancel Event...!", {
        variant: "error",
        displayIcon: true,
      });
      setLoading(false);
      return;
    }

    // success
    showNotificationMsg("Event Canceled Successfully...!", {
      variant: "success",
      displayIcon: true,
    });
    setLoading(false);
    onEventCancel && onEventCancel();
    return;
  };

  return (
    <>
      {loading && <BackDropLoader />}
      <ConfirmDialog
        open={confirmCancelEvent}
        setOpen={setConfirmCancelEvent}
        message={
          "Are you sure to cancel this event?. This action is irreversible."
        }
        confirmText={"Yes"}
        dismissText={"No"}
        onConfirm={cancelEvent}
      />
      <div className={styles.eventManageOptionsWrapper}>
        <span>
          <Link href={`/teamhub/events/${eventId}/edit`}>
            <a>
              <div className={styles.manageOption}>
                <div>
                  <EditEventSVG />
                  <span className={styles.manageOptionTitle}>Edit Event</span>
                </div>
                <span>
                  <RightArrowSVG />
                </span>
              </div>
            </a>
          </Link>
        </span>
        {eventType !== eventTypes.SOCIAL && (
          <div className={styles.manageOption}>
            <div>
              <ConfirmLineupSVG />
              <span className={styles.manageOptionTitle}>Confirm Lineup</span>
            </div>
            <span>
              <RightArrowSVG />
            </span>
          </div>
        )}
        {isEventCancelable && (
          <div
            className={cn(styles.manageOption)}
            onClick={() => isEventCancelable && setConfirmCancelEvent(true)}
          >
            <div>
              <CancelEventSVG />
              <span className={styles.manageOptionTitle}>Cancel Event</span>
            </div>
            <span>
              <RightArrowSVG />
            </span>
          </div>
        )}
      </div>
    </>
  );
}

function EventDetails({
  event,
  user,
  ownerInTeams,
  leaderInTeams,
  coachInTeams,
  playerInTeams,
}) {
  const [_event, setEvent] = useState({ ...event });
  const [_eventHomeTeam, setEventHomeTeam] = useState(null);
  const [_userAvailable, setUserAvailable] = useState(null);
  const [_eventTeams, setEventTeams] = useState([]);
  const [_availablePlayers, setAvailablePlayers] = useState([]);
  const [manageMode, setManageMode] = useState(false);

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
    const eventTeams = event?.teams?.map((x) => {
      const team = x?.teamId || x?.team;
      return {
        id: team?.id,
        title: team?.title,
        crest: team?.crest || "/assets/club-badge-placeholder.png",
      };
    });
    setEventTeams([...eventTeams]);
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

  const onEventCancel = () => {
    setEvent({
      ..._event,
      status: eventStatusTypes.CANCELED,
    });
  };

  return (
    <div className={styles.eventsWrapper}>
      <h1>{_event?.title}</h1>
      <EventCover
        eventFee={_event?.fee?.forNonSub?.toFixed(2) || "0.00"} // TODO: conditional render if user is sub/non-sub
        eventCurrency={_event?.currency || "??"}
        eventCoverImage={_event?.coverImage || "/assets/placeholder-event.png"}
        currencyBeforeFee={true}
      />
      <EventOptionButtons
        eventId={_event?.id}
        hasLineup={_event?.eventType === eventTypes.MATCH}
        showManageButton={ownerInTeams?.length > 0 || leaderInTeams?.length > 0}
        manageMode={manageMode}
        setManageMode={setManageMode}
      />
      <div className={styles.eventBodyWrapper}>
        <EventInfo
          eventId={_event?.id}
          eventType={_event?.eventType}
          eventTeams={_eventTeams}
          eventDate={moment(_event?.eventDateTime).format("Do MMMM YYYY")}
          eventTime={moment(_event?.eventDateTime).format("h:mm A")}
          eventLocation={_event?.location}
          actionButton={(() => {
            if (_event?.status === eventStatusTypes?.CANCELED) {
              return {
                text: "Event Canceled!",
                type: "danger",
                disabled: true,
              };
            }
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
          manageMode={manageMode}
          totalAvailablePlayers={_availablePlayers?.length}
        />
        {!manageMode && (
          <EventPlayersList availablePlayers={_availablePlayers} />
        )}
        {manageMode && (
          <EventManageOptions
            eventId={_event?.id}
            eventType={_event?.eventType}
            isEventCancelable={(() => {
              if (new Date(_event?.eventDateTime) < new Date()) return false;
              if (_event?.status === eventStatusTypes.CANCELED) return false;
              return true;
            })()}
            onEventCancel={onEventCancel}
          />
        )}
      </div>
    </div>
  );
}

export default EventDetails;
