import React from "react";
import cn from "classnames";
import styles from "./index.module.css";

function TeamhubNav({ nav, selectedIndex, setIndex }) {
  return (
    <div className={styles.teamhubNav}>
      <ul className={styles.navList}>
        {nav.map((item, index) => (
          <li
            className={cn(
              styles.navItem,
              index == selectedIndex && styles.selected
            )}
            onClick={() => setIndex(index)}
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
