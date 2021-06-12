import React, { useState } from "react";
import TeamhubNav from "./navbar";
import TeamhubRouter from "./router";

import styles from "./index.module.css";

function DashboardContent({ data }) {
  const [selectedIndex, setIndex] = useState(0);
  const nav = ["Dashboard", "Events", "Payments", "Statistics", "Event Detail"];
  return (
    <div className={styles.dashboard}>
      <TeamhubNav nav={nav} selectedIndex={selectedIndex} setIndex={setIndex} />
      <TeamhubRouter selectedIndex={selectedIndex} />
    </div>
  );
}

export default DashboardContent;
