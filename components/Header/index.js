import React from "react";

import Navbar from "../UI/Navbar/Navbar";
import Notifications from "../UI/Notifications/Notifications";

function Header() {
  return (
    <div className="header">
      <Navbar />
      <Notifications />
    </div>
  );
}

export default Header;
