import React from "react";
import styles from "./away-kit.module.css";

const AwayKit = ({
  state,
  colorPlayers,
  colorGoalkeeper,
  openModalPlHandler,
  openModalGkHandler,
  awayKitHandler,
}) => {
  return (
    <div
      onClick={awayKitHandler}
      className={`${styles.awayKit} ${state ? styles.activeKit : ""}`}
    >
      <h3 className={styles.awayKitTitle}>Away Kit</h3>
      <div className={styles.awayKitItem}>
        <div className={styles.awayKitItemAway}>
          <span className={styles.awayKitItemText}>Away</span>
          <div
            onDoubleClick={openModalPlHandler}
            style={{ background: `${colorPlayers}` }}
            className={styles.awayKitItemAwColor}
          ></div>
        </div>
        <div className={styles.awayKitItemGoalkeeper}>
          <span className={styles.awayKitItemText}>Away Goalkeeper</span>
          <div
            onDoubleClick={openModalGkHandler}
            style={{ background: `${colorGoalkeeper}` }}
            className={styles.awayKitItemGkColor}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default AwayKit;
