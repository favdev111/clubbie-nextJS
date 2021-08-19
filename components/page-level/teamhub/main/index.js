import React, { useState, useEffect } from "react";
import TeamhubNav from "./navigation";
import Dashboard from "./dashboard";
import Events from "./events/dashboard";
import EventDetails from "./events/details";
import Payments from "./payments";
import Statistics from "./statistics";
import { useRouter } from "next/router";
import styles from "./index.module.css";

function TeamhubRouter({ activeTeam, setTeam, selectedIndex, user, event }) {
  return (
    <>
      {selectedIndex == 0 && (
        <Dashboard activeTeam={activeTeam} setTeam={setTeam} user={user} />
      )}
      {selectedIndex == 1 && <Events user={user} />}
      {selectedIndex == 2 && <Payments />}
      {selectedIndex == 3 && <Statistics activeTeam={activeTeam} user={user} />}
      {selectedIndex == 4 && <EventDetails user={user} event={event} />}
    </>
  );
}

function DashboardContent({ activeTeam, setTeam, user, event }) {
  const [selectedIndex, setIndex] = useState(null);
  const nav = ["Dashboard", "Events", "Payments", "Statistics"];

  const myRouter = useRouter();

  useEffect(() => {
    if (myRouter.pathname == "/teamhub/events") setIndex(1);
    if (myRouter.pathname == "/teamhub/payments") setIndex(2);
    if (myRouter.pathname == "/teamhub/statistics") setIndex(3);
    if (myRouter.pathname == "/teamhub/events/[id]") setIndex(4);
  }, [myRouter.pathname]);

  return (
    <div className={styles.dashboard}>
      <TeamhubNav nav={nav} selectedIndex={selectedIndex} setIndex={setIndex} />
      <TeamhubRouter
        activeTeam={activeTeam}
        setTeam={setTeam}
        user={user}
        event={event}
        selectedIndex={selectedIndex}
      />
    </div>
  );
}

export default DashboardContent;
