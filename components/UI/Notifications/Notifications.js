import React from "react";

function Notifications() {
  return (
    <div className="notifications">
      <img
        className="notificiation__item"
        src={require("../../../public/assets/messages.svg")}
      />
      <img
        className="notificiation__item"
        src={require("../../../public/assets/notifications.svg")}
      />
      <img src={require("../../../public/assets/avatar.png")} />
    </div>
  );
}

export default Notifications;
