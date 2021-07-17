import React from "react";
import Dropdown from "@sub/dropdown";
import NotificationsSvg from "@svg/notifications";
import Messages from "@svg/messages";
import styles from "./notifications.module.css";
import Link from "next/link";

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
      <Link href="/chats">
        <a className={styles.notificationItem}>
          <Messages />
        </a>
      </Link>
      <a className={styles.notificationItem}>
        <NotificationsSvg />
      </a>
      <Dropdown
        list={links}
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
