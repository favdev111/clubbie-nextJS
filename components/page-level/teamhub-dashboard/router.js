import React from "react";
import Dashboard from "./tabs/dashboard";
import Events from "./tabs/events";
import Payments from "./tabs/payments";
import Statistics from "./tabs/Statistics";

function TeamhubRouter({ selectedIndex }) {
  return (
    <>
      {selectedIndex == 0 && <Dashboard />}
      {selectedIndex == 1 && <Events />}
      {selectedIndex == 2 && <Payments />}
      {selectedIndex == 3 && <Statistics />}
    </>
  );
}

export default TeamhubRouter;
