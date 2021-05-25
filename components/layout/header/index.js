import React from "react";
import Navbar from "../navbar";
import Notifications from "./notifications";
import styles from "./header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <Navbar />
      <Notifications />
    </div>
  );
}

export default Header;
