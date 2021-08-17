import React, { useState, useEffect } from "react";
import Link from "next/link";
import cn from "classnames";
import moment from "moment";
import Button from "@sub/button";
import ContentDialog from "@sub/content-dialog";
import BackDropLoader from "@sub/backdrop-loader";
import useNotification from "@sub/hook-notification";
import ThreeDots from "@svg/threedots";
import DateSVG from "@svg/date";
import KickOffSVG from "@svg/kickoff";
import PlaceSVG from "@svg/place";
import Events from "@api/services/Events";
import eventTypes from "@utils/fixedValues/eventTypes";
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
  const [loading, setLoading] = useState(false);
  const [_actionButton, setActionButton] = useState(null);
  const [
    openAvailabilityConfirmationDialog,
    setOpenAvailabilityConfirmationDialog,
  ] = useState(false);

  useEffect(() => {
    setActionButton({ ...actionButton });
  }, [actionButton]);

  const { showNotificationMsg } = useNotification();

  const setEventAvailability = async (available) => {
    setLoading(true);

    const response = await Events.SetAvailability(eventId, {
      available,
    }).catch(() => null);

    // show error
    if (!response) {
      showNotificationMsg("Could not set availability", {
        variant: "error",
        displayIcon: true,
      });
      setLoading(false);
      return;
    }

    // show success
    showNotificationMsg("Availability set Successfully..!", {
      variant: "success",
      displayIcon: true,
    });
    setActionButton({
      text: available ? "Available" : "Not Available",
      type: available ? "success" : "danger",
    });
    setLoading(false);
  };

  return (
    <>
      {loading && <BackDropLoader />}
      <ContentDialog
        open={openAvailabilityConfirmationDialog}
        setOpen={setOpenAvailabilityConfirmationDialog}
        title={"Event Availability"}
        Body={() => <p>Are you available?</p>}
        confirmText={"Available"}
        dismissText={"Not Available"}
        onConfirm={async () => {
          setOpenAvailabilityConfirmationDialog(false);
          await setEventAvailability(true);
        }}
        onDismiss={async () => {
          setOpenAvailabilityConfirmationDialog(false);
          await setEventAvailability(false);
        }}
        type={"success"}
      />
      <Button
        className={styles.eventCardActionButton}
        variant={_actionButton?.type}
        onClick={() =>
          !_actionButton?.disabled &&
          setOpenAvailabilityConfirmationDialog(true)
        }
        disabled={loading}
      >
        {_actionButton?.text}
      </Button>
    </>
  );
}

function EventCard({
  eventId,
  eventType,
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
              return { text: "Line-up Confirmed", type: "info" };
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
