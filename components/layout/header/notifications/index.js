import React from "react";
import styles from "./notifications.module.css";
import NotificationsSvg from "@svg/notifications";
import Messages from "@svg/messages";

function Notifications() {
  return (
    <div className={styles.notifications}>
      <a className={styles.notificationItem}>
        <Messages />
      </a>

      <a className={styles.notificationItem}>
        <NotificationsSvg />
      </a>

      <img src="/assets/avatar.png" />
    </div>
  );
}

export default Notifications;
