import React from "react";

import NotificationRow from "@sub/notification-list/row";
import NotificationCard from "@sub/notification-list/card";

function AllNotifications() {
  const notifications = [
    {
      src: "./assets/team1.png",
      title: "Shottery Mens First Team",
      desc: "Line up is now up!",
      hour: "10:35",
    },
    {
      src: "./assets/team1.png",
      title: "Shottery Mens First Team",
      desc: "Line up is now up!",
      hour: "10:35",
    },
    {
      src: "./assets/team1.png",
      title: "Shottery Mens First Team",
      desc: "Line up is now up!",
      hour: "10:35",
    },
    {
      src: "./assets/team1.png",
      title: "Shottery Mens First Team",
      desc: "Line up is now up!",
      hour: "10:35",
    },
    {
      src: "./assets/team1.png",
      title: "Shottery Mens First Team",
      desc: "Line up is now up!",
      hour: "10:35",
    },
  ];
  return (
    <>
      <NotificationRow>
        {notifications.map((notificaton, index) => (
          <NotificationCard key={index} data={notificaton} />
        ))}
      </NotificationRow>
    </>
  );
}

export default AllNotifications;
