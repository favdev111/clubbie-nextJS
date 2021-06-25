import React from "react";
import styles from "./index.module.css";
import cn from "classnames";

function TeamCard({ index, data, active, setactive }) {
  const { src, name } = data;
  /* Not done yet */

  return (
    <div
      onClick={() => setactive(index)}
      className={cn(styles.teamCards, active == index && styles.active)}
    >
      <img className={styles.cardImg} src={src} />
      {/* data[0].crest.s3Url image */}
      <div className={styles.cardDetail}>
        <p className={styles.cardSpan}> {name} </p>
        <p>
          Logged in as <span className={styles.yellow}> Player</span>
        </p>
      </div>
    </div>
  );
}

export default TeamCard;
