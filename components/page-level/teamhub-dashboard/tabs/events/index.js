import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import EditIcon from "@svg/edit.js";
import DateTable from "./date-table";
import EventCard from "./card";
import Link from "next/link";
import Event from "@api/services/Event";

function Events({ activeTeam, user }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
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
          <Link href="/teamhub/add-event">
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
          {events.map((card) => (
            <EventCard
              activeTeam={activeTeam}
              user={user}
              key={Math.random() + 12}
              data={card}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Events;
