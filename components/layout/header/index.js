import React from "react";
import Navbar from "../navbar";
import Notifications from "./notifications";
import styles from "./header.module.css";
import MobileNavigation from "./mobile";

function Header() {
  return (
    <header className={styles.header}>
      <Navbar />
      <Notifications />
      <MobileNavigation />
    </header>
  );
}

export default Header;
