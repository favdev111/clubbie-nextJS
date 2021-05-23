import React from "react";
import styles from "./notifications.module.css";

function Notifications() {
  return (
    <div className={styles.notifications}>
      <img className={styles.notificationItem} src="/assets/messages.svg" />
      <img
        className={styles.notificationItem}
        src="/assets/notifications.svg"
      />
      <img src="/assets/avatar.png" />
    </div>
  );
}

export default Notifications;
