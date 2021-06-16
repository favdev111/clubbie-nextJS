import React, { useState } from "react";
import styles from "./index.module.css";
import RouteButton from "../teamhub-dashboard/route-button";
import AllNotifications from "./all-notifications";
import Unread from "./unread";
import Events from "./events";

function Notifications() {
  const [activeButton, setActive] = useState(0);

  const route = ["All Notifications", "Unread", "Events"];
  return (
    <div className={styles.notifications}>
      <h1> Notifications</h1>
      <div className={styles.buttons}>
        {route.map((button, index) => (
          <RouteButton
            setActive={setActive}
            index={index}
            active={activeButton}
            key={button + index}
          >
            {button}
          </RouteButton>
        ))}
      </div>
      {activeButton == 0 && <AllNotifications />}
      {activeButton == 1 && <Unread />}
      {activeButton == 2 && <Events />}
    </div>
  );
}

export default Notifications;
