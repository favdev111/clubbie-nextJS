import React, { useState } from "react";
import styles from "./index.module.css";
import RouteButton from "../../route-button";
import StatisticResults from "./results";
import StatisticFixtures from "./fixtures";
import LeagueTables from "./league-tables";
import PlayerStats from "./player-stats";

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

  const fixtures = [
    {
      homeTeam: { name: "Shottery United", src: "./assets/team1.png" },
      awayTeam: { name: "Men's FC", src: "./assets/team2.png" },
      eventDetails: {
        date: "07.01.12",
        kickoff: "02.00 PM",
        adress: "Lorem Upsum Street,",
        state: "Lorem, 01277",
      },
    },
    {
      homeTeam: { name: "Shottery United", src: "./assets/team1.png" },
      awayTeam: { name: "Men's FC", src: "./assets/team2.png" },
      eventDetails: {
        date: "07.01.12",
        kickoff: "02.00 PM",
        adress: "Lorem Upsum Street,",
        state: "Lorem, 01277",
      },
    },
  ];

  return (
    <div className={styles.statistics}>
      <h1> Statistics</h1>
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
        {activeButton == 0 && <div> select box</div>}
      </div>
      {/* Route */}

      {activeButton == 0 && <StatisticResults data={results} />}
      {activeButton == 1 && <StatisticFixtures data={fixtures} />}
      {activeButton == 2 && <LeagueTables />}
      {activeButton == 3 && <PlayerStats />}
    </div>
  );
}

export default Statistics;
