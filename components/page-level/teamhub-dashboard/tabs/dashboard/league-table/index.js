import React from "react";
import LeagueTableRow from "./row";
import styles from "./index.module.css";

function LeagueTable() {
  const table = [
    {
      teamname: "Shottery",
      p: "4",
      w: "4",
      d: "0",
      l: "0",
      f: "19",
      a: "5",
      gd: "14",
      pts: "12",
    },
    {
      teamname: "Other",
      p: "4",
      w: "4",
      d: "0",
      l: "0",
      f: "19",
      a: "5",
      gd: "14",
      pts: "12",
    },
    {
      teamname: "Other",
      p: "4",
      w: "4",
      d: "0",
      l: "0",
      f: "19",
      a: "5",
      gd: "14",
      pts: "12",
    },
    {
      teamname: "Other",
      p: "4",
      w: "4",
      d: "0",
      l: "0",
      f: "19",
      a: "5",
      gd: "14",
      pts: "12",
    },
    {
      teamname: "Other",
      p: "4",
      w: "4",
      d: "0",
      l: "0",
      f: "19",
      a: "5",
      gd: "14",
      pts: "12",
    },
  ];
  return (
    <div className={styles.table}>
      <LeagueTableRow tableHead />
      {table.map((info, index) => (
        <LeagueTableRow key={info + index} index={index} data={info} />
      ))}
    </div>
  );
}

export default LeagueTable;
