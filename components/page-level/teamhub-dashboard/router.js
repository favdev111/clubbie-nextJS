import React from "react";
import Dashboard from "./tabs/dashboard";
import Events from "./tabs/events";
import Payments from "./tabs/payments";
import Statistics from "./tabs/statistics";
import EventDetail from "./tabs/event-detail";

function TeamhubRouter({ activeTeam, setTeam, selectedIndex, user, token }) {
  return (
    <>
      {selectedIndex == 0 && (
        <Dashboard
          activeTeam={activeTeam}
          setTeam={setTeam}
          user={user}
          token={token}
        />
      )}
      {selectedIndex == 1 && (
        <Events activeTeam={activeTeam} user={user} token={token} />
      )}
      {selectedIndex == 2 && <Payments />}
      {selectedIndex == 3 && <Statistics />}
      {selectedIndex == 4 && <EventDetail />}
    </>
  );
}

export default TeamhubRouter;
