import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import DetailCover from "./cover";
import MatchDetail from "./match-detail";
import AvailablePlayers from "./players";

import Event from "@api/services/Event";

function EventDetail({ eventId, activeTeam, user }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const teamId = user.teams[activeTeam].team;

    const fetchEvents = async () => {
      const response = await Event.FetchSingleEvent(eventId, teamId);
      setData(response.data);
    };
    fetchEvents();
  }, [activeTeam]);

  console.log(data);
  return (
    <div className={styles.eventDetail}>
      <h1>Event Details</h1>
      <DetailCover img={data?.coverImage} />
      <div className={styles.twoRows}>
        <MatchDetail />
        <AvailablePlayers />
      </div>
    </div>
  );
}

export default EventDetail;
