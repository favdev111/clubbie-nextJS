import React from "react";
import styles from "./index.module.css";
import cn from "classnames";

function TeamCard({ index, data, active, setactive, teamRoles }) {
  /* Not done yet */
  console.log(data);
  return (
    <div
      onClick={() => setactive(index)}
      className={cn(styles.teamCards, active == index && styles.active)}
    >
      <img className={styles.cardImg} src={data.crest?.s3Url} />
      {/* data[0].crest.s3Url image */}
      <div className={styles.cardDetail}>
        <p className={styles.cardSpan}> {data.title} </p>
        <p>
          Logged in as
          <span className={styles.yellow}> {teamRoles[index]}</span>
        </p>
      </div>
    </div>
  );
}

export default TeamCard;
