import React, { useState, useEffect } from "react";
import TeamhubNav from "./navbar";
import TeamhubRouter from "./router";
import { useRouter } from "next/router";

import styles from "./index.module.css";

function DashboardContent({ activeTeam, setTeam, user }) {
  const [selectedIndex, setIndex] = useState(0);
  const nav = ["Dashboard", "Events", "Payments", "Statistics"];

  const myRouter = useRouter();

  useEffect(() => {
    if (myRouter.pathname == "/teamhub/event/[id]") {
      setIndex(4);
    }
    if (myRouter.pathname == "/teamhub/event") {
      setIndex(1);
    }
    if (myRouter.pathname == "/teamhub/payments") {
      setIndex(2);
    }
    if (myRouter.pathname == "/teamhub/statistics") {
      setIndex(3);
    }
  }, [myRouter.pathname]);

  return (
    <div className={styles.dashboard}>
      <TeamhubNav nav={nav} selectedIndex={selectedIndex} setIndex={setIndex} />
      <TeamhubRouter
        activeTeam={activeTeam}
        setTeam={setTeam}
        user={user}
        selectedIndex={selectedIndex}
      />
    </div>
  );
}

export default DashboardContent;
