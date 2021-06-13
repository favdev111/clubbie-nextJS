import React, { useState } from "react";
import styles from "./index.module.css";
import RouteButton from "../../route-button";
import StatisticResults from "./results";

function Statistics() {
  const [activeButton, setActive] = useState(0);
  const route = ["Results", "Fixtures", "League Tables", "Player Stats"];
  const results = [
    {
      date: "Saturday, 27 February",
      events: [
        {
          hometeam: { name: "Shottery United", src: "./assets/team1.png" },
          awayteam: { name: "Men's 1st FC", src: "./assets/team2.png" },
          score: "3 - 0",
        },
        {
          hometeam: { name: "Shottery United", src: "./assets/team1.png" },
          awayteam: { name: "Men's 1st FC", src: "./assets/team2.png" },
          score: "2 - 3",
        },
      ],
    },
    {
      date: "Saturday, 27 February",
      events: [
        {
          hometeam: { name: "Shottery United", src: "./assets/team1.png" },
          awayteam: { name: "Men's 1st FC", src: "./assets/team2.png" },
          score: "3 - 0",
        },
      ],
    },
    {
      date: "Saturday, 27 February",
      events: [
        {
          hometeam: { name: "Shottery United", src: "./assets/team1.png" },
          awayteam: { name: "Men's 1st FC", src: "./assets/team2.png" },
          score: "3 - 0",
        },
      ],
    },
  ];
  return (
    <div className={styles.statistics}>
      <h1> Payments</h1>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.buttons}>
          {route.map((button, index) => (
            <RouteButton
              setActive={setActive}
              index={index}
              active={activeButton}
              key={button + index}
            >
              {button}
            </RouteButton>
          ))}
        </div>
        <div> select box</div>
      </div>
      {/* Route */}

      {activeButton == 0 && <StatisticResults data={results} />}
      {/*       {activeButton == 1 && <EventsPayments />}
      {activeButton == 2 && <PaymentsSubscriptions />} */}
    </div>
  );
}

export default Statistics;
