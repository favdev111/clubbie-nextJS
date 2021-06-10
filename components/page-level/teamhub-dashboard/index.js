import React, { useState } from "react";
import TeamhubNav from "./navbar";

function DashboardContent() {
  const [selectedIndex, setIndex] = useState(0);
  const nav = ["Dashboard", "Events", "Payments", "Statistics"];
  return (
    <div>
      <TeamhubNav nav={nav} selectedIndex={selectedIndex} setIndex={setIndex} />
    </div>
  );
}

export default DashboardContent;
