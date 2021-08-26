import React, { useState, useEffect } from "react";
import TeamhubNav from "./navigation";
import Dashboard from "./dashboard";
import Events from "./events/dashboard";
import EventDetails from "./events/details";
import EventLineupDashboard from "./events/lineup/dashboard";
import Payments from "./payments";
import Statistics from "./statistics";
import { useRouter } from "next/router";
import roles from "@utils/fixedValues/rolesList";
import styles from "./index.module.css";

function TeamhubDashboard({ activeTeam, setTeam, user, event }) {
  const router = useRouter();

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [ownerInTeams, setOwnerInTeams] = useState([]);
  const [leaderInTeams, setLeaderInTeams] = useState([]);
  const [playerInTeams, setPlayerInTeams] = useState([]);
  const [coachInTeams, setCoachInTeams] = useState([]);

  useEffect(() => {
    // set auth roles for user from event teams
    const _ownerInTeams = [];
    const _leaderInTeams = [];
    const _coachInTeams = [];
    const _playerInTeams = [];
    const teamIds = event?.teams?.map((x) => x?.teamId?.id || x?.team?.id);
    user?.teams?.map((x) => {
      if (teamIds?.includes(x?.team)) {
        x?.role?.toLowerCase() === roles?.OWNER && _ownerInTeams?.push(x?.team);
        x?.role?.toLowerCase() === roles?.TEAM_LEAD &&
          _leaderInTeams?.push(x?.team);
        x?.role?.toLowerCase() === roles?.TEAM_COACH &&
          _coachInTeams?.push(x?.team);
        x?.role?.toLowerCase() === roles?.PLAYER &&
          _playerInTeams?.push(x?.team);
      }
    });
    setOwnerInTeams([..._ownerInTeams]);
    setLeaderInTeams([..._leaderInTeams]);
    setCoachInTeams([..._coachInTeams]);
    setPlayerInTeams([..._playerInTeams]);

    // set active component
    if (router?.pathname === "/teamhub") setSelectedIndex(0);
    if (router?.pathname === "/teamhub/events") setSelectedIndex(1);
    if (router?.pathname === "/teamhub/payments") setSelectedIndex(2);
    if (router?.pathname === "/teamhub/statistics") setSelectedIndex(3);
    if (router?.pathname === `/teamhub/events/[id]`) setSelectedIndex(4);
    if (router?.pathname === `/teamhub/events/[id]/lineup`) setSelectedIndex(5);
  }, []);

  return (
    <div className={styles.dashboard}>
      <TeamhubNav />
      {selectedIndex == 0 && (
        <Dashboard activeTeam={activeTeam} setTeam={setTeam} user={user} />
      )}
      {selectedIndex == 1 && <Events user={user} />}
      {selectedIndex == 2 && <Payments />}
      {selectedIndex == 3 && <Statistics activeTeam={activeTeam} user={user} />}
      {selectedIndex == 4 && (
        <EventDetails
          user={user}
          event={event}
          ownerInTeams={ownerInTeams}
          leaderInTeams={leaderInTeams}
          coachInTeams={coachInTeams}
          playerInTeams={playerInTeams}
        />
      )}
      {selectedIndex == 5 && (
        <EventLineupDashboard
          user={user}
          event={event}
          ownerInTeams={ownerInTeams}
          leaderInTeams={leaderInTeams}
          coachInTeams={coachInTeams}
          playerInTeams={playerInTeams}
        />
      )}
    </div>
  );
}

export default TeamhubDashboard;
