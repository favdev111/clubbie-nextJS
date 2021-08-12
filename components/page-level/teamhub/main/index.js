import React, { useState, useEffect } from "react";
import TeamhubNav from "./navigation";
import Dashboard from "./dashboard";
import Events from "./events";
import Payments from "./payments";
import Statistics from "./statistics";
import EventDetail from "./event-detail";
import { useRouter } from "next/router";
import styles from "./index.module.css";

function TeamhubRouter({ activeTeam, setTeam, selectedIndex, user, eventId }) {
  return (
    <>
      {selectedIndex == 0 && (
        <Dashboard activeTeam={activeTeam} setTeam={setTeam} user={user} />
      )}
      {selectedIndex == 1 && <Events activeTeam={activeTeam} user={user} />}
      {selectedIndex == 2 && <Payments />}
      {selectedIndex == 3 && <Statistics activeTeam={activeTeam} user={user} />}
      {selectedIndex == 4 && (
        <EventDetail activeTeam={activeTeam} user={user} eventId={eventId} />
      )}
    </>
  );
}

function DashboardContent({ activeTeam, setTeam, user, eventId }) {
  const [selectedIndex, setIndex] = useState(0);
  const nav = ["Dashboard", "Events", "Payments", "Statistics"];

  const myRouter = useRouter();

  useEffect(() => {
    if (myRouter.pathname == "/teamhub/event") setIndex(1);
    if (myRouter.pathname == "/teamhub/payments") setIndex(2);
    if (myRouter.pathname == "/teamhub/statistics") setIndex(3);
    if (myRouter.pathname == "/teamhub/event/[id]") setIndex(4);
  }, [myRouter.pathname]);

  return (
    <div className={styles.dashboard}>
      <TeamhubNav nav={nav} selectedIndex={selectedIndex} setIndex={setIndex} />
      <TeamhubRouter
        activeTeam={activeTeam}
        setTeam={setTeam}
        user={user}
        eventId={eventId}
        selectedIndex={selectedIndex}
      />
    </div>
  );
}

export default DashboardContent;
