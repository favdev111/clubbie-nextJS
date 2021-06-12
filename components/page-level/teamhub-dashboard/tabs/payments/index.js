import React, { useState } from "react";
import styles from "./index.module.css";

import ButtonForPayments from "./button";
import AllPayments from "./all-payments";
import EventsPayments from "./event";

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
          <ButtonForPayments
            setActive={setActive}
            index={index}
            active={activeButton}
            key={button + index}
          >
            {button.text}
          </ButtonForPayments>
        ))}
      </div>
      {activeButton == 0 && <AllPayments />}
      {activeButton == 1 && <EventsPayments />}
      {/*        {activeButton == 2 && <AllPayments />}
       */}
    </div>
  );
}

export default Payments;
