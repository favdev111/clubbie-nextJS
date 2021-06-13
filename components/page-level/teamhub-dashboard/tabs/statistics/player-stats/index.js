import React from "react";
import styles from "./index.module.css";

function PlayerStats() {
  const stats = [
    {
      name: "Joe Richards",
      rank: 1,
      appearances: 5,
      goals: 3,
      assists: 2,
      yellowCard: 0,
      redCard: 0,
    },
    {
      name: "Charies Freeman",
      rank: 1,
      appearances: 5,
      goals: 3,
      assists: 2,
      yellowCard: 0,
      redCard: 0,
    },
    {
      name: "Jerry Fuller",
      rank: 1,
      appearances: 5,
      goals: 3,
      assists: 2,
      yellowCard: 0,
      redCard: 0,
    },
    {
      name: "Will Brewer",
      rank: 1,
      appearances: 5,
      goals: 3,
      assists: 2,
      yellowCard: 0,
      redCard: 0,
    },
    {
      name: "Louis Lucas",
      rank: 1,
      appearances: 5,
      goals: 3,
      assists: 2,
      yellowCard: 0,
      redCard: 0,
    },
  ];
  return (
    <div className={styles.playerStats}>
      <h3> Player Stats</h3>
      {/* Table head  */}
      <div className={styles.tableHead}>
        <div className={styles.cellName}>Player</div>
        <div className={styles.Cell}>Rank</div>
        <div className={styles.Cell}>Appearances</div>
        <div className={styles.Cell}>Goals</div>
        <div className={styles.Cell}>Assist</div>
        <div className={styles.Cell}>Yellow Card</div>
        <div className={styles.Cell}>Red Card</div>
      </div>
      {/* Table */}
      {stats.map((player) => (
        <div className={styles.table}>
          <div className={styles.cellName}> {player.name}</div>
          <div className={styles.Cell}> {player.rank}</div>
          <div className={styles.Cell}> {player.appearances}</div>
          <div className={styles.Cell}> {player.goals}</div>
          <div className={styles.Cell}> {player.assists}</div>
          <div className={styles.Cell}> {player.yellowCard}</div>
          <div className={styles.Cell}> {player.redCard}</div>
        </div>
      ))}
    </div>
  );
}

export default PlayerStats;
