import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@sub/button";
import matchFormations from "@utils/fixedValues/matchFormations";
import playerRoles from "@utils/fixedValues/playerRoles";
import FormationList from "../common/formationList";
import Pitch from "../common/pitch";
import styles from "./index.module.css";

function SubstitutesList({ substitues }) {
  return (
    <div className={styles.eventSubstituesListWrapper}>
      <h4>Substitutes{` ( ${substitues?.length || 0} )`}</h4>
      {substitues?.length > 0 && (
        <div className={styles.eventSubstituesList}>
          {substitues?.map((substitute) => (
            <Link href={`/profiles/${substitute?.user?.id}`}>
              <a>
                <div className={styles.eventSubstituesListItem}>
                  {substitute?.user?.profile?.fullName || substitute?.user?.id}
                </div>
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function LineupOptions({ eventId }) {
  return (
    <div className={styles.eventOptionsWrapper}>
      <Link href={`/teamhub/events/${eventId}`}>
        <a>
          <Button size="medium" varinat="info">
            Details
          </Button>
        </a>
      </Link>
    </div>
  );
}

function LineupDashboard({ user, event }) {
  const [_event, setEvent] = useState(null);
  const [_eventHomeTeam, setEventHomeTeam] = useState(null);
  const [_eventHomeTeamPlayers, setEventHomeTeamPlayers] = useState(null);
  const [
    _eventHomeTeamSubstituesPlayers,
    setEventHomeTeamSubstituesPlayers,
  ] = useState(null);

  useEffect(() => {
    setEvent({ ...event });

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

    // set home team players with unique positions
    const uniquePlayerPositions = new Set();
    const _players = homeTeam?.attendees?.filter(
      (x) =>
        (x?.role === playerRoles?.PLAYER ||
          x?.role === playerRoles?.GOAL_KEEPER) &&
        !uniquePlayerPositions.has(x?.position) &&
        uniquePlayerPositions.add(x?.position)
    );
    setEventHomeTeamPlayers([..._players]);

    // set home team substitue players
    const _substitues = homeTeam?.attendees?.filter(
      (x) => x?.role === playerRoles?.SUBSTITUTE
    );
    setEventHomeTeamSubstituesPlayers([..._substitues]);
  }, []);

  return (
    <div className={styles.eventLineupWrapper}>
      <h1>Shottery United v. Shottery Not United</h1>
      <div className={styles.eventFormationsListWrapper}>
        <FormationList
          selectMode={false}
          selected={_eventHomeTeam?.formation || matchFormations.NO_FORMATION}
        />
      </div>
      <div className={styles.eventFormationsPitchWrapper}>
        <Pitch
          editMode={false}
          formation={_eventHomeTeam?.formation || matchFormations.NO_FORMATION}
          playerShirtColor={_eventHomeTeam?.kit?.teamColor || "#e7ba19"} // TODO: make theme file
          goalKeeperShirtColor={
            _eventHomeTeam?.kit?.goalKeeperColor || "#c41d24"
          } // TODO: make theme file
          lineup={_eventHomeTeamPlayers}
        />
      </div>
      <SubstitutesList substitues={_eventHomeTeamSubstituesPlayers} />
      <LineupOptions eventId={_event?.id} />
    </div>
  );
}

export default LineupDashboard;
