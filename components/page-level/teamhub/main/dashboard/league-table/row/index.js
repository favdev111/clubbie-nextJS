import React from "react";
import styles from "./index.module.css";
import cn from "classnames";

function LeagueTableRow({
  data = {
    title: "Team",
    played: "P",
    won: "W",
    drawn: "D",
    lose: "L",
    for: "F",
    against: "A",
    gd: "GD",
    points: "PTS",
  },
  tableHead,
  index,
}) {
  const { title, played, won, drawn, lose, against, gd, points } = data;
  return (
    <div
      className={cn(
        styles.row,
        tableHead && styles.tableHead,
        index % 2 === 0 ? styles.darkerBg : styles.brightBg
      )}
    >
      <div className={cn(styles.teamCell, index == 0 && styles.first)}>
        {title}
      </div>
      <div className={styles.cell}> {played}</div>
      <div className={styles.cell}> {won}</div>
      <div className={styles.cell}> {drawn}</div>
      <div className={styles.cell}> {lose}</div>
      <div className={styles.cell}> {data?.for}</div>
      <div className={styles.cell}> {against}</div>
      <div className={styles.cell}>
        {gd} {index > -1 && data?.for - against}
      </div>
      <div className={cn(styles.cell, !tableHead && styles.pts)}> {points}</div>
    </div>
  );
}

export default LeagueTableRow;
