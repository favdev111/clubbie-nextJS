import React from "react";
import styles from "./index.module.css";
import cn from "classnames";

function RouteButton({ children, index, active, setActive }) {
  return (
    <button
      onClick={() => setActive(index)}
      className={cn(styles.button, index == active && styles.active)}
    >
      {children}
    </button>
  );
}

export default RouteButton;
