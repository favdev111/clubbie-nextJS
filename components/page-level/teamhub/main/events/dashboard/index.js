import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DateTime } from "luxon";
import ProgressBar from "@sub/progress";
import EditIcon from "@svg/edit.js";
import DateTable from "./date-table";
import EventCard from "./card";
import Event from "@api/services/Event";
import styles from "./index.module.css";

const newDate = new Date();
const currentMonth = newDate.getMonth();

function Events({ activeTeam, user }) {
  const [selectedMonth, setSelected] = useState(currentMonth);
  const [filteredEvents, setFiltered] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const userRole = user.teams[activeTeam].role;

  useEffect(() => {
    setDataLoaded(false);

    const fetchEvents = async () => {
      const query = {
        teamId: user?.teams[0].team,
      };
      const response = await Event.QueryEvents(query).catch(() => null);

      setFiltered(
        response.data.results.filter((item) => {
          if (userRole == "teamLead")
            return (
              DateTime.fromISO(item.eventDateTime, { zone: "utc" }).month ==
              selectedMonth + 1
            );
          else
            return (
              DateTime.fromISO(item.eventDateTime, { zone: "utc" }).month ==
                selectedMonth + 1 && item.status == "published"
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
          <h1>Events</h1>

          {/* Drafts, Add event etc */}
          {/* {userRole == "teamLead" && ( */}
          <Link href="/teamhub/events/add-event/">
            <a>
              <div className={styles.draft}>
                <EditIcon />
                <p>Add new event </p>
              </div>
            </a>
          </Link>
          {/* )} */}
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
