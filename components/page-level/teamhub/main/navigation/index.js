import React from "react";
import cn from "classnames";
import styles from "./index.module.css";
import router from "next/router";

function TeamhubNav({ nav, selectedIndex }) {
  return (
    <div className={styles.teamhubNav}>
      <ul className={styles.navList}>
        {nav.map((item, index) => (
          <li
            className={cn(
              styles.navItem,
              index == selectedIndex && styles.selected
            )}
            onClick={() => {
              index == 0 && router.push("/teamhub");
              index == 1 && router.push("/teamhub/events");
              index == 2 && router.push("/teamhub/payments");
              index == 3 && router.push("/teamhub/statistics");
            }}
            key={item + index}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamhubNav;
