import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import DetailCover from "./cover";
import MatchDetail from "./match-detail";
import AvailablePlayers from "./players";
import EditEvent from "@svg/edit-event";
import ConfirmLineup from "@svg/confirm-lineup";
import CancelEvent from "@svg/cancel-event";
import { useRouter } from "next/router";
import Save from "@svg/save";

import Link from "next/link";
import RightArrow from "@svg/right-arrow";

import Event from "@api/services/Event";

import MessageToUser from "@sub/messageAnimation";

function EventDetail({ eventId, activeTeam, user }) {
  const [data, setData] = useState();
  const [responseMessage, setResponseMessage] = useState();
  const [isError, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  console.log(data);
  const playerUnavailable =
    data?.teams[0].attendees.filter((i) => i.user == user.id).length < 1;

  const userRole = user.teams[activeTeam].role;
  const router = useRouter();

  useEffect(() => {
    const teamId = user?.teams[activeTeam].team;

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
      .then((res) => {
        setResponseMessage("Succesfully changed.");
        setSuccess(true);
      })
      .catch((err) => {
        setResponseMessage(err.response.data.message);
        setError(true);
      });
  };

  const setAvailability = (e) => {
    e.preventDefault();

    const patchAvailability = async () => {
      const res = await Event.SetAvailability(data.id, {
        available: !playerUnavailable,
      });
      console.log("res", res);
    };
    patchAvailability()
      .then((res) => {
        setResponseMessage("Succesfully changed.");
        setSuccess(true);
      })
      .catch((err) => {
        setResponseMessage(err.response.data.message);
        setError(true);
      });
    setError(false);
    setSuccess(false);
  };

  return (
    <div className={styles.eventDetail}>
      <h1>{data?.title}</h1>
      <DetailCover data={data} img={data?.coverImage} />
      <div className={styles.twoRows}>
        {data?.eventType == "match" && <MatchDetail data={data} />}
        {data?.eventType == "training" && <h1> Training </h1>}
        {data?.eventType == "social" && <h1> social </h1>}
        {isError && <MessageToUser message={responseMessage} err={isError} />}

        {isSuccess && (
          <MessageToUser message={responseMessage} err={isSuccess} />
        )}

        {/*    <AvailablePlayers /> */}
        {/* Edit Event */}
        {userRole == "teamLead" && data?.eventType == "match" && (
          <Link href={`/teamhub/event/edit-event/${eventId}`}>
            <div className={styles.routeComponent}>
              <div className={styles.center}>
                <EditEvent /> Edit event
              </div>
              <RightArrow />
            </div>
          </Link>
        )}
        {/* Confirm Line Up */}
        {userRole == "teamLead" && data?.eventType !== "social" && (
          <Link href={`/teamhub/event/confirm-lineup/${eventId}`}>
            <div className={styles.routeComponent}>
              <div className={styles.center}>
                <ConfirmLineup /> Confirm Line-up
              </div>
              <RightArrow />
            </div>
          </Link>
        )}
        {userRole == "teamLead" && (
          <button
            disabled={data?.status !== "published"}
            onClick={cancelEvent}
            className={styles.routeComponent}
          >
            <div className={styles.center}>
              <CancelEvent /> Cancel event
            </div>
            <RightArrow />
          </button>
        )}

        {userRole == "player" && (
          <button
            disabled={data?.status !== "published"}
            onClick={setAvailability}
            className={styles.routeComponent}
          >
            <div className={styles.center}>
              <Save />
              {playerUnavailable ? "Be available" : "Be unavailable"}
            </div>
            <RightArrow />
          </button>
        )}
      </div>
    </div>
  );
}

export default EventDetail;
