import React from "react";
import LeagueTableRow from "./row";
import styles from "./index.module.css";

function LeagueTable({ data }) {
  return (
    <div className={styles.table}>
      <div className={styles.tblScroll}>
        <div className={styles.scrollTbl}>
          <LeagueTableRow tableHead />
          {data.map((info, index) => (
            <LeagueTableRow key={info + index} index={index} data={info} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeagueTable;
