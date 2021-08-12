import React from "react";
import styles from "./index.module.css";
import { DateTime } from "luxon";

function EventDetails({ data }) {
  const { eventDateTime, location } = data;
  const upNextDate = DateTime.fromISO(eventDateTime, { zone: "utc" });
  return (
    <div className={styles.details}>
      {upNextDate.c.day}.{upNextDate.c.month}.{upNextDate.c.year}
      <p>
        Kickoff at {upNextDate.c.hour}:{upNextDate.c.minute}
      </p>
      <span className="opacity-50"> {location} </span>
      {/*       <span className="opacity-50"> {state} </span> */}
    </div>
  );
}

export default EventDetails;
