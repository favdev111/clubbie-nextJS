import React from "react";
import Navbar from "../navbar";
import Notifications from "./notifications";
import styles from "./header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <Navbar />
      <Notifications />
    </header>
  );
}

export default Header;
