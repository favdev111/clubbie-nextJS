import React from "react";
import styles from "./index.module.css";
import Link from "next/link";

function MobileNavigation() {
  const navItems = [
    {
      name: "Notification",
      navSrc: "./",
      imgSrc: "/assets/mobile-nav/bell.svg",
    },
    { name: "Clubbie", navSrc: "./", imgSrc: "/assets/mobile-nav/clubbie.svg" },
    {
      name: "Add Content",
      navSrc: "./",
      imgSrc: "/assets/mobile-nav/plus-circle.svg",
    },
    { name: "Profile", navSrc: "./", imgSrc: "/assets/mobile-nav/profile.svg" },
    { name: "TeamHub", navSrc: "./", imgSrc: "/assets/mobile-nav/teamhub.svg" },
  ];
  return (
    <footer className={styles.mobileNav}>
      <ul className={styles.navList}>
        {navItems.map((item, index) => (
          <li key={item + index} className={styles.navItem}>
            <Link href={item.navSrc}>
              <div>
                <div className={styles.navSvg}>
                  <img src={item.imgSrc} alt={item.name} />
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
