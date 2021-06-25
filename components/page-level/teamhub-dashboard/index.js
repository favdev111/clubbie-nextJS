import React, { useState } from "react";
import TeamhubNav from "./navbar";
import TeamhubRouter from "./router";

import styles from "./index.module.css";

function DashboardContent({ activeTeam, setTeam, user, token }) {
  const [selectedIndex, setIndex] = useState(0);
  const nav = ["Dashboard", "Events", "Payments", "Statistics"];

  return (
    <div className={styles.dashboard}>
      <TeamhubNav nav={nav} selectedIndex={selectedIndex} setIndex={setIndex} />
      <TeamhubRouter
        activeTeam={activeTeam}
        setTeam={setTeam}
        user={user}
        token={token}
        selectedIndex={selectedIndex}
      />
    </div>
  );
}

export default DashboardContent;
