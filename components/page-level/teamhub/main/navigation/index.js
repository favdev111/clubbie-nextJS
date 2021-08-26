import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
import styles from "./index.module.css";

function TeamhubNav() {
  const router = useRouter();

  const navItems = [
    {
      title: "Dashboard",
      link: "/teamhub",
      active: router?.pathname === "/teamhub",
    },
    {
      title: "Events",
      link: "/teamhub/events",
      active: router?.pathname?.includes("/teamhub/events"),
    },
    {
      title: "Payments",
      link: "/teamhub/payments",
      active: router?.pathname?.includes("/teamhub/payments"),
    },
    {
      title: "Statistics",
      link: "/teamhub/statistics",
      active: router?.pathname?.includes("/teamhub/statistics"),
    },
  ];

  return (
    <div className={styles.teamhubNav}>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <Link href={item?.link}>
            <a>
              <li
                className={cn(styles.navItem, item?.active && styles.selected)}
                key={item?.title}
              >
                {item?.title}
              </li>
            </a>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default TeamhubNav;
