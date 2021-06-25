import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import EditIcon from "@svg/edit.js";
import DateTable from "./date-table";
import EventCard from "./card";

import Event from "@api/services/event";
import HTTPClient from "@api/HTTPClient";

function Events({ activeTeam, user, token }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    HTTPClient.setHeader("Authorization", `Bearer ${token}`);

    /* Not done yet */
    const fetchEvents = async () => {
      const teamQuery = {
        teamId: user.teams[activeTeam].team,
      };
      const response = await Event.GetQueryEvents(teamQuery);
      setEvents(response.data.results);
    };
    fetchEvents();
  }, []);

  const date = new Date();
  const month = date.getMonth();
  const [selectedMonth, setSelected] = useState(month);

  return (
    <>
      <div className={styles.event}>
        <div className={styles.eventHeader}>
          <h1> Events</h1>

          {/* Drafts, Add event etc */}
          <div className={styles.draft}>
            <EditIcon />
            <p>2 in Draft </p>
          </div>
        </div>

        {/* Date */}
        <DateTable setSelected={setSelected} selected={selectedMonth} />

        {/* Cards */}
        <div className={styles.eventCardsRow}>
          {events.map((card) => (
            <EventCard
              user={user}
              token={token}
              key={card + Math.random()}
              data={card}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Events;
