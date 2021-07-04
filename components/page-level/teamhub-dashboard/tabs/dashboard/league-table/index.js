import React from "react";
import LeagueTableRow from "./row";
import styles from "./index.module.css";

function LeagueTable({ data }) {
  return (
    <div className={styles.table}>
      <LeagueTableRow tableHead />
      {data.map((info, index) => (
        <LeagueTableRow key={info + index} index={index} data={info} />
      ))}
    </div>
  );
}

export default LeagueTable;
