import React from "react";
import Link from "next/link";
import Logo from "../Logo";
import styles from "./navbar.module.scss"


function Navbar() {
  return (
    <div className={styles.navbar}>
      <Logo />
      <ul className={styles.navbarList}>
        {["Home", "Teamhub"].map((nav, index) => (
          <li key={`${nav}index`} className={styles.navbarListItem}>
            <Link href="./">
              <div className={styles.navbarListItemLink}>{nav}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
