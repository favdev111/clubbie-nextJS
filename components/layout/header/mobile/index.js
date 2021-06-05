import React from "react";
import styles from "./index.module.css";

function MobileNavigation() {
  const navItems = [
    { name: "Notification", src: "/assets/mobile-nav/bell.svg" },
    { name: "Clubbie", src: "/assets/mobile-nav/clubbie.svg" },
    { name: "Add Content", src: "/assets/mobile-nav/plus-circle.svg" },
    { name: "Profile", src: "/assets/mobile-nav/profile.svg" },
    { name: "TeamHub", src: "/assets/mobile-nav/teamhub.svg" },
  ];
  return (
    <footer className={styles.mobileNav}>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li className={styles.navItem}>
            <div className={styles.navSvg}>
              <img src={item.src} alt={item.name} />
            </div>
            <span className={styles.navText}> {item.name} </span>
          </li>
        ))}
      </ul>
    </footer>
  );
}

export default MobileNavigation;
