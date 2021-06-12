import React from "react";
import styles from "./index.module.css";
import MatchInfo from "@sub/match-info";
import MatchCard from "@sub/match-card";

function MatchDetail() {
  return (
    <div className={styles.matchDetail}>
      <MatchCard
        data={{
          hometeam: { name: "Shottery", src: "./assets/team1.png" },
          awayteam: { name: "Men's", src: "./assets/team2.png" },
        }}
      />
      <MatchInfo
        data={{
          date: "12 Feb 2021",
          kickoff: "01:00 PM",
          place: "Shottery Fields, Stratfort",
        }}
      />
    </div>
  );
}

export default MatchDetail;
