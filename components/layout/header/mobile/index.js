import React from "react";
import styles from "./index.module.css";
import Link from "next/link";

import Bell from "@svg/mobile/bell";
import Clubbie from "@svg/mobile/clubbie";
import Plus from "@svg/mobile/plus";
import Profile from "@svg/mobile/profile";
import Teamhub from "@svg/mobile/teamhub";

function MobileNavigation() {
  const navItems = [
    {
      name: "Notification",
      navSrc: "./",
    },
    { name: "Clubbie", navSrc: "./" },
    {
      name: "Add Content",
      navSrc: "./",
    },
    { name: "Profile", navSrc: "./" },
    { name: "TeamHub", navSrc: "./" },
  ];
  return (
    <footer className={styles.mobileNav}>
      <ul className={styles.navList}>
        {navItems.map((item, index) => (
          <li key={item + index} className={styles.navItem}>
            <Link href={item.navSrc}>
              <div>
                <div className={styles.navSvg}>
                  {index == 0 && <Bell />}
                  {index == 1 && <Clubbie />}
                  {index == 2 && <Plus />}
                  {index == 3 && <Profile />}
                  {index == 4 && <Teamhub />}
                </div>
                <span className={styles.navText}> {item.name} </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}

export default MobileNavigation;
