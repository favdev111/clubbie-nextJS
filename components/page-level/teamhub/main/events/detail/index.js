import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import MessageToUser from "@sub/messageAnimation";
import EditEvent from "@svg/edit-event";
import ConfirmLineup from "@svg/confirm-lineup";
import CancelEvent from "@svg/cancel-event";
import Save from "@svg/save";
import RightArrow from "@svg/right-arrow";
import styles from "./index.module.css";
import DetailCover from "./cover";
import Event from "@api/services/Event";
import MatchDetail from "./match-detail";
import SocialDetail from "./social-detail";

function EventDetail({ eventId, activeTeam, user }) {
  const [data, setData] = useState();
  const [responseMessage, setResponseMessage] = useState();
  const [isError, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const userTeam = user.teams[activeTeam].team;

  /* For team leader */

  const availablePlayersForEvent = data?.teams?.filter(
    (t) => t.teamId.id == userTeam
  )[0].attendees;

  /* For player */
  const playerUnavailable =
    data?.teams[0].attendees.filter((i) => i.user == user.id).length < 1;

  const playerUnavailableForMatch =
    data?.teams
      .filter((t) => t.teamId.id == userTeam)[0]
      .attendees?.filter((i) => i.user.id == user.id).length < 1;

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
    };
    patch()
      .then((res) => {
        setResponseMessage("Succesfully changed.");
        setSuccess(true);
      })
      .catch((err) => {
        setResponseMessage(err.response.data.message);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  };

  const setAvailability = (e) => {
    e.preventDefault();

    const patchAvailability = async () => {
      const res = await Event.SetAvailability(data.id, {
        available: !playerUnavailable,
      });
    };
    patchAvailability()
      .then((res) => {
        setResponseMessage("Succesfully changed.");
        setSuccess(true);
      })
      .catch((err) => {
        setResponseMessage(err.response.data.message);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      });
    setError(false);
    setSuccess(false);
  };

  return (
    <div className={styles.eventDetail}>
      <h1>{data?.title}</h1>
      <DetailCover data={data} img={data?.coverImage} />
      <div className={styles.twoRows}>
        {data?.eventType == "match" && (
          <MatchDetail
            players={availablePlayersForEvent}
            userRole={userRole}
            data={data}
          />
        )}
        {data?.eventType == "training" && <h1> Training </h1>}
        {data?.eventType == "social" && <SocialDetail data={data} />}
        {/*    <AvailablePlayers /> */}
        {/* Edit Event */}
        {userRole == "teamLead" && data?.eventType == "match" && (
          <Link href={`/teamhub/event/edit-event/${eventId}`}>
            <a>
              <div className={styles.routeComponent}>
                <div className={styles.center}>
                  <EditEvent /> Edit event
                </div>
                <RightArrow />
              </div>
            </a>
          </Link>
        )}
        {/* Confirm Line Up */}
        {userRole == "teamLead" && data?.eventType !== "social" && (
          <Link href={`/teamhub/event/confirm-lineup/${eventId}`}>
            <a>
              <div className={styles.routeComponent}>
                <div className={styles.center}>
                  <ConfirmLineup /> Confirm Line-up
                </div>
                <RightArrow />
              </div>
            </a>
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
              {data?.eventType == "match"
                ? playerUnavailableForMatch
                  ? "Be available"
                  : "Be unavailable"
                : playerUnavailable
                ? "Be available"
                : "Be unavailable"}
            </div>
            <RightArrow />
          </button>
        )}
      </div>
      {isError && <MessageToUser message={responseMessage} err={isError} />}

      {isSuccess && (
        <MessageToUser message={responseMessage} err={!isSuccess} />
      )}
    </div>
  );
}

export default EventDetail;
