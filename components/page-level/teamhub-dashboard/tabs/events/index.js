import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import EditIcon from "@svg/edit.js";
import DateTable from "./date-table";
import EventCard from "./card";
import Link from "next/link";
import Event from "@api/services/Event";

import ProgressBar from "@sub/progress";

import { DateTime } from "luxon";

const newDate = new Date();
const currentMonth = newDate.getMonth();

function Events({ activeTeam, user }) {
  const [selectedMonth, setSelected] = useState(currentMonth);
  const [filteredEvents, setFiltered] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    setDataLoaded(false);
    const fetchEvents = async () => {
      const teamQuery = {
        teamId: user.teams[activeTeam].team,
      };
      const response = await Event.GetQueryEvents(teamQuery);

      setFiltered(
        response.data.results.filter((item) => {
          return (
            DateTime.fromISO(item.eventDateTime, { zone: "utc" }).month ==
            selectedMonth + 1
          );
        })
      );
      setDataLoaded(true);
    };
    fetchEvents();
  }, [user, selectedMonth]);

  return (
    <>
      <div className={styles.event}>
        <div className={styles.eventHeader}>
          <h1> Events</h1>

          {/* Drafts, Add event etc */}
          <Link href="/teamhub/event/add-event/">
            <div className={styles.draft}>
              <EditIcon />
              <p>Add new event </p>
            </div>
          </Link>
        </div>

        {/* Date */}
        <DateTable setSelected={setSelected} selected={selectedMonth} />

        {/* Cards */}
        <div className={styles.eventCardsRow}>
          {!dataLoaded ? (
            <ProgressBar />
          ) : filteredEvents.length > 0 ? (
            filteredEvents.map((card) => (
              <EventCard
                activeTeam={activeTeam}
                user={user}
                key={Math.random() + 12}
                data={card}
              />
            ))
          ) : (
            <p> There is no event in selected month. </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Events;
