import React, { useState } from "react";
import styles from "./index.module.css";
import EditIcon from "@svg/edit.js";
import DateTable from "./date-table";

function Events() {
  const date = new Date();
  const month = date.getMonth();
  const [selectedMonth, setSelected] = useState(month);
  return (
    <div className={styles.eventContent}>
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
      </div>
    </div>
  );
}

export default Events;
