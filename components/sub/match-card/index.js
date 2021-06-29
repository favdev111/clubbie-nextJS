import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

import Event from "@api/services/Event";

function MatchCard({ user, eventId, activeTeam }) {
  const [data, setData] = useState(null);

  /* Not done yet */

  useEffect(() => {
    const teamId = user.teams[activeTeam].team;

    const fetchEvents = async () => {
      const response = await Event.FetchSingleEvent(eventId, teamId);
      setData(response.data);
    };
    fetchEvents();
  }, [activeTeam]);

  return (
    <div className={styles.score}>
      <div className={styles.teamCard}>
        {data && <img src={data?.teams[0].teamId.crest} />}
        {data && data?.teams[0].teamId.title}
      </div>

      <div className={styles.scoreMiddle}>
        <p className="opacity-50">Match</p>
        <h1>vs</h1>
      </div>

      <div className={styles.teamCard}>
        {data && <img src={data?.teams[1].teamId.crest} />}
        {data && data?.teams[1].teamId.title}
      </div>
    </div>
  );
}

export default MatchCard;
