import React, { useState } from "react";
import styles from "./index.module.css";
import EditIcon from "@svg/edit.js";
import DateTable from "./date-table";
import EventCard from "./card";

function Events() {
  const date = new Date();
  const month = date.getMonth();
  const [selectedMonth, setSelected] = useState(month);

  const data = [
    {
      hometeam: { name: "Shottery", src: "./assets/team1.png" },
      awayteam: { name: "Men's", src: "./assets/team2.png" },
      src: "./assets/events1.png",
      date: "15 Feb 2021",
      kickoff: "01:00 PM",
      price: 4,
      place: "Shottery Fiels, Statford-upon-Avon",
      available: true,
    },
    {
      hometeam: { name: "Shottery", src: "./assets/team1.png" },
      awayteam: { name: "Men's", src: "./assets/team2.png" },
      src: "./assets/events2.png",
      date: "15 Feb 2021",
      kickoff: "01:00 PM",
      price: 4,
      place: "Shottery Fiels, Statford-upon-Avon",
      available: false,
    },
    {
      hometeam: { name: "Shottery", src: "./assets/team1.png" },
      awayteam: { name: "Men's", src: "./assets/team2.png" },
      date: "15 Feb 2021",
      src: "./assets/events3.png",
      kickoff: "01:00 PM",
      price: 4,
      place: "Shottery Fiels, Statford-upon-Avon",
      available: false,
    },
    {
      hometeam: { name: "Shottery", src: "./assets/team1.png" },
      awayteam: { name: "Men's", src: "./assets/team2.png" },
      date: "15 Feb 2021",
      src: "./assets/events1.png",
      kickoff: "01:00 PM",
      price: 4,
      place: "Shottery Fiels, Statford-upon-Avon",
      available: false,
    },
  ];
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
          {data.map((card) => (
            <EventCard key={card + Math.random()} data={card} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Events;
