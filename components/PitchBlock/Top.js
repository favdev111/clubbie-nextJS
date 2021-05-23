import React from "react";
import Button from "@sub/button";
import styles from "./top.module.css";

const Top = ({ lineUp, formationHandler }) => {
  return (
    <>
      <div className={styles.top}>
        <h1 className={styles.topTitle}>Shottery United v. Stratford Town</h1>
        <ul className={styles.topFormat}>
          <li
            onClick={formationHandler}
            className={`${styles.topFormatItem} ${
              lineUp === "4-4-2" ? styles.activeLineup : ""
            }`}
          >
            4-4-2
          </li>
          <li
            onClick={formationHandler}
            className={`${styles.topFormatItem} ${
              lineUp === "4-3-3" ? styles.activeLineup : ""
            }`}
          >
            4-3-3
          </li>
          <li
            onClick={formationHandler}
            className={`${styles.topFormatItem} ${
              lineUp === "4-5-1" ? styles.activeLineup : ""
            }`}
          >
            4-5-1
          </li>
          <li
            onClick={formationHandler}
            className={`${styles.topFormatItem} ${
              lineUp === "No formation" ? styles.activeLineup : ""
            }`}
          >
            No formation
          </li>
        </ul>
        <div className={styles.topBtnLineup}>
          <Button>Edit LineUp</Button>
        </div>
        {/*<div className={styles.topUndo}>*/}
        {/*    <Link href="#">*/}
        {/*        <a>*/}
        {/*            <img className={styles.topUndoImg} src="/assets/undo.svg" alt="undo"/>*/}
        {/*            <span className={styles.topUndoText}>Undo</span>*/}
        {/*        </a>*/}
        {/*    </Link>*/}
        {/*</div>*/}
      </div>
    </>
  );
};
export default Top;
