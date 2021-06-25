import React from "react";
import Link from "next/link";
import styles from "./notifications.module.css";
import NotificationsSvg from "@svg/notifications";
import Messages from "@svg/messages";

function Notifications({ authUser }) {
  return (
    <div className={styles.notifications}>
      <a className={styles.notificationItem}>
        <Messages />
      </a>

      <a className={styles.notificationItem}>
        <NotificationsSvg />
      </a>

      <Link href="/profile/self">
        <img
          className={styles.profileBubble}
          src={
            authUser?.profile?.image?.s3Url || "/assets/person-placeholder.jpg"
          }
        />
      </Link>
    </div>
  );
}

export default Notifications;
