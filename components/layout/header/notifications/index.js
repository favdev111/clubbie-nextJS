import React from "react";
import Dropdown from "@sub/dropdown";
import NotificationsSvg from "@svg/notifications";
import Messages from "@svg/messages";
import styles from "./notifications.module.css";

function Notifications({ authUser }) {
  const links = [
    {
      href: "/profile/self",
      title: "Profile",
    },
    {
      href: "/auth/logout",
      title: "Logout",
      seperator: true,
    },
  ];

  return (
    <div className={styles.notifications}>
      <a className={styles.notificationItem}>
        <Messages />
      </a>

      <a className={styles.notificationItem}>
        <NotificationsSvg />
      </a>
      <Dropdown
        links={links}
        Component={() => (
          <img
            className={styles.profileBubble}
            src={authUser?.profile?.image || "/assets/person-placeholder.jpg"}
          />
        )}
      ></Dropdown>
    </div>
  );
}

export default Notifications;
