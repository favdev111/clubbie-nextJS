import React, { useState } from "react";
import styles from "./index.module.css";
import AllPayments from "./all-payments";
import EventsPayments from "./event";
import PaymentsSubscriptions from "./subscriptions";
import RouteButton from "../common/route-button";

function Payments() {
  const [activeButton, setActive] = useState(0);
  const route = [
    { text: "All Payments" },
    { text: "Events" },
    { text: "Subscriptions" },
  ];
  return (
    <div className={styles.payments}>
      <h1> Payments</h1>
      <div className={styles.buttons}>
        {route.map((button, index) => (
          <RouteButton
            setActive={setActive}
            index={index}
            active={activeButton}
            key={button + index}
          >
            {button.text}
          </RouteButton>
        ))}
      </div>
      {activeButton == 0 && <AllPayments />}
      {activeButton == 1 && <EventsPayments />}
      {activeButton == 2 && <PaymentsSubscriptions />}
    </div>
  );
}

export default Payments;
