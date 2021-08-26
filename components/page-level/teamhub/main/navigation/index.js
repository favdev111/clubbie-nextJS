import React from "react";
import { useRouter } from "next/router";
import cn from "classnames";
import styles from "./index.module.css";

function TeamhubNav() {
  const router = useRouter();

  const navItems = [
    { title: "Dashboard", active: router?.pathname === "/teamhub" },
    { title: "Events", active: router?.pathname?.includes("/teamhub/events") },
    {
      title: "Payments",
      active: router?.pathname?.includes("/teamhub/payments"),
    },
    {
      title: "Statistics",
      active: router?.pathname?.includes("/teamhub/statistics"),
    },
  ];

  return (
    <div className={styles.teamhubNav}>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li
            className={cn(styles.navItem, item?.active && styles.selected)}
            onClick={() => {
              index == 0 && router.push("/teamhub");
              index == 1 && router.push("/teamhub/events");
              index == 2 && router.push("/teamhub/payments");
              index == 3 && router.push("/teamhub/statistics");
            }}
            key={item?.title}
          >
            {item?.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamhubNav;
