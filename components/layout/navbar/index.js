import React from "react";
import Link from "next/link";
import Logo from "@sub/logo";
import styles from "./navbar.module.css";

function Navbar() {
  return (
    <div className={styles.navbar}>
      <Logo />
      <ul className={styles.navbarList}>
        <li className={styles.navbarListItem}>
          <Link href="/">
            <div className={styles.navbarListItemLink}> Home </div>
          </Link>
        </li>
        <li className={styles.navbarListItem}>
          <Link href="/teamhub">
            <div className={styles.navbarListItemLink}>Teamhub</div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
