import React, { useState, useEffect } from "react";
import cn from "classnames";
import Link from "next/link";
import ProgressBar from "@sub/progress";
import EditIcon from "@svg/edit.js";
import EventsMonthSelector from "./month-selector";
import EventCard from "./card";
import Events from "@api/services/Event";
import styles from "./index.module.css";

function EventsHeader() {
  return (
    <div className={styles.eventsHeader}>
      <h1>Events</h1>
      <span>
        <Link href="/teamhub/events/add-event/">
          <a>
            <span className={styles.draft}>
              <EditIcon />
              <p>Add new event </p>
            </span>
          </a>
        </Link>
      </span>
    </div>
  );
}

function EventsList({ events, loading }) {
  return (
    <div className={styles.eventCardsRow}>
      {loading ? (
        <div className={cn(styles.loadingWrapper, styles.span2)}>
          <ProgressBar />
        </div>
      ) : events?.results?.length > 0 ? (
        events?.results?.map((x) => (
          <EventCard
            eventId={x?.id}
            eventType={x?.eventType}
            eventTeams={x?.teams.map((y) => {
              return {
                id: y?.team?.id,
                title: y?.team?.title,
                crest: y?.team?.crest || "/assets/club-badge-placeholder.png",
              };
            })}
            eventCoverImage={
              x?.eventCoverImage || "/assets/person-placeholder.jpg"
            }
            eventFee={x?.fee?.toFixed(2) || "0.00"}
            eventCurrency={"£"}
            currencySymbolBeforeFee={true}
            eventDateTime={x?.eventDateTime}
            eventLocation={x?.location}
          />
        ))
      ) : (
        <span>There are no events in the selected month.</span>
      )}
    </div>
  );
}

function EventsDashboard({ user }) {
  const currentMonthIndex = new Date().getMonth();

  const [_user] = useState(user);
  const [_events, setEvents] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(
    currentMonthIndex
  );

  const fetchEvents = async () => {
    const response = await Events.QueryEvents({}).catch(() => null);
    if (response) {
      const _toSet = {
        ...response?.data,
        results: response?.data?.results?.map((x) => {
          return {
            ...x,
            teams: x?.teams?.map((y) => {
              const temp = {
                ...y,
                team: y?.teamId,
              };
              delete temp["teamId"];
              return temp;
            }),
          };
        }),
      };
      setEvents(_toSet);
    }
  };

  useEffect(async () => {
    setLoading(true);
    await fetchEvents();
    setLoading(false);
  }, [selectedMonthIndex]);

  return (
    <div className={styles.eventsWrapper}>
      <EventsHeader />
      <EventsMonthSelector
        setSelectedMonthIndex={setSelectedMonthIndex}
        selectedMonthIndex={selectedMonthIndex}
      />
      <EventsList events={_events} loading={loading} />
    </div>
  );
}

export default EventsDashboard;
