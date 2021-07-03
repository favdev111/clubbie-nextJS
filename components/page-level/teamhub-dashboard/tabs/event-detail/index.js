import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import DetailCover from "./cover";
import MatchDetail from "./match-detail";
import AvailablePlayers from "./players";
import EditEvent from "@svg/edit-event";
import ConfirmLineup from "@svg/confirm-lineup";
import CancelEvent from "@svg/cancel-event";
import { useRouter } from "next/router";
import Link from "next/link";

import RightArrow from "@svg/right-arrow";

import Event from "@api/services/Event";

function EventDetail({ eventId, activeTeam, user }) {
  const [data, setData] = useState();
  const [cancelMessage, setMessage] = useState();
  const router = useRouter();

  console.log(data);

  useEffect(() => {
    const teamId = user.teams[activeTeam].team;

    const fetchEvents = async () => {
      const response = await Event.FetchSingleEvent(eventId, teamId);
      setData(response.data);
    };
    fetchEvents();
  }, [activeTeam]);

  const cancelEvent = (e) => {
    e.preventDefault();
    const patch = async () => {
      const response = await Event.CancelEventbyId(eventId);
      console.log(response);
    };
    patch()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.eventDetail}>
      <h1>{data?.title}</h1>
      <DetailCover data={data} img={data?.coverImage} />
      <div className={styles.twoRows}>
        <MatchDetail data={data} />
        {/*    <AvailablePlayers /> */}
        <Link href={`/teamhub/event/edit-event/${eventId}`}>
          <div className={styles.routeComponent}>
            <div className={styles.center}>
              <EditEvent /> Edit event
            </div>
            <RightArrow />
          </div>
        </Link>
        {/* todo */}
        <Link href={`/teamhub/event/confirm-lineup/${eventId}`}>
          <div className={styles.routeComponent}>
            <div className={styles.center}>
              <ConfirmLineup /> Confirm Line-up
            </div>
            <RightArrow />
          </div>
        </Link>
        <button
          disabled={data?.status == "draft"}
          onClick={cancelEvent}
          className={styles.routeComponent}
        >
          <div className={styles.center}>
            <CancelEvent /> Cancel event
          </div>
          <RightArrow />
        </button>
      </div>
    </div>
  );
}

export default EventDetail;
