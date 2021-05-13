import React from "react";
import Navbar from "../UI/Navbar";
import Notifications from "../UI/Notifications";
import styles from './header.module.scss';


function Header() {
  return (
    <div className={styles.header}>
      <Navbar />
      <Notifications />
    </div>
  );
}

export default Header;
