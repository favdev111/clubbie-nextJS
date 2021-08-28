import React, { useState, useEffect } from "react";
import cn from "classnames";
import FormationList from "../common/formationList";
import Pitch from "../common/pitch";
import styles from "./index.module.css";

function PlayersList({ availablePlayers, unAvailablePlayers }) {
  return (
    <div
      className={cn(
        styles.eventPlayersWrapper,
        availablePlayers && styles.eventAvailablePlayersList,
        unAvailablePlayers && styles.eventUnAvailablePlayersList
      )}
    >
      <div className={styles.eventPlayerHeader}>
        <h3>
          {availablePlayers && "Available"}
          {unAvailablePlayers && "Uavailable"} Players
        </h3>
        {availablePlayers && <h3>Last Played</h3>}
      </div>
      <div className={styles.eventPlayersList}>
        {(availablePlayers || unAvailablePlayers)?.map((player) => (
          <div className={cn(styles.eventPlayerItem)}>
            <span>{player?.user?.profile?.fullName || player?.user?.id}</span>
            {availablePlayers && (
              <span>{player?.lastMatchPlayedDate || "-"}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function LineupCreate({ user, event }) {
  const [_event, setEvent] = useState(null);
  const [_eventTitle, setEventTitle] = useState(null);
  const [_eventHomeTeam, setEventHomeTeam] = useState(null);
  const [_availablePlayers, setAvailablePlayers] = useState(null);
  const [_unAvailablePlayers, setUnAvailablePlayers] = useState(null);

  useEffect(() => {
    setEvent({ ...event });

    // set event title
    const eventTeamTitles = event?.teams?.map(
      (x) => x?.teamId?.title || x?.team?.title
    );
    setEventTitle(`${eventTeamTitles[0]} v. ${eventTeamTitles[1]}`);

    // set home team
    const homeTeam = (() => {
      const _temp = event?.teams?.find((x) =>
        x?.attendees?.find((a) => a?.user?.id === user?.id)
      );
      _temp.team = _temp?.teamId;
      delete _temp["teamId"];
      return _temp;
    })();
    setEventHomeTeam({ ...homeTeam });

    // set home team available/non-available players
    const availablePlayers = [];
    const unAvailablePlayers = [];
    homeTeam?.attendees?.map((x) =>
      x?.available ? availablePlayers?.push(x) : unAvailablePlayers.push(x)
    );
    setAvailablePlayers([...availablePlayers]);
    setUnAvailablePlayers([...unAvailablePlayers]);
  }, []);

  return (
    <div className={styles.eventLineupWrapper}>
      <PlayersList availablePlayers={_availablePlayers} />
      <div className={styles.eventPitchAndFormationWrappper}>
        <h1>{_eventTitle}</h1>
        <div className={styles.eventFormationsListWrapper}>
          <FormationList selectMode={true} />
        </div>
        <div className={styles.eventPitchWrapper}>
          <Pitch editMode={true} />
        </div>
      </div>
      <PlayersList unAvailablePlayers={_unAvailablePlayers} />
    </div>
  );
}

export default LineupCreate;
