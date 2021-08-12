import React from "react";
import cn from "classnames";
import Link from "next/link";
import RightArrow from "@svg/right-arrow";
import styles from "./teamhubcard.module.css";

function TeamhubCard({ data, type, last }) {
  return (
    <div className={cn(styles.teamhubCard, last && styles.last)}>
      {type === "club" && <img src="/assets/teamhub.png" />}
      {type === "leader" && <img src="/assets/teamhub2.png" />}
      {type === "player" && <img src="/assets/teamhub3.png" />}
      <div className={styles.teamhubCardInfo}>
        <h3> {data.title}</h3>
        <p className="opacity-50"> {data.desc} </p>
      </div>
      <Link href={data.link}>
        <a>
          <button className={styles.teamhubCardButton}>
            <RightArrow />
          </button>
        </a>
      </Link>
    </div>
  );
}

export default TeamhubCard;
