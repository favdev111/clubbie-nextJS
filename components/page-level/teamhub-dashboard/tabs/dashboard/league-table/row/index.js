import React from "react";
import styles from "./index.module.css";
import cn from "classnames";

function LeagueTableRow({
  data = {
    teamname: "Team",
    p: "P",
    w: "W",
    d: "D",
    l: "L",
    f: "F",
    a: "A",
    gd: "GD",
    pts: "PTS",
  },
  tableHead,
  index,
}) {
  const { teamname, p, w, d, l, f, a, gd, pts } = data;
  return (
    <div
      className={cn(
        styles.row,
        tableHead && styles.tableHead,
        index % 2 === 0 ? styles.darkerBg : styles.brightBg
      )}
    >
      <div className={cn(styles.teamCell, index == 0 && styles.first)}>
        {teamname}
      </div>
      <div className={styles.cell}> {p}</div>
      <div className={styles.cell}> {w}</div>
      <div className={styles.cell}> {d}</div>
      <div className={styles.cell}> {l}</div>
      <div className={styles.cell}> {f}</div>
      <div className={styles.cell}> {a}</div>
      <div className={styles.cell}> {gd}</div>
      <div className={cn(styles.cell, !tableHead && styles.pts)}> {pts}</div>
    </div>
  );
}

export default LeagueTableRow;
