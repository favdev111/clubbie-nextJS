import React from "react";
import styles from "./join.module.css";
import Link from "next/link";

function Join({ title, data, current }) {
  return (
    <div className={styles.join}>
      <div className={styles.joinHeader}>
        <div className={styles.joinHeaderInner}>
          <Link href="/">
            <a>
              <button>
                <img src="/assets/back.svg" />
              </button>
            </a>
          </Link>
          <h1> {title} </h1>
          {current && (
            <div className={styles.joinHeaderCurrent}>
              <img src="/assets/aondimentum.svg" />
              Aondimentum
            </div>
          )}
        </div>

        <button className={styles.skip}> Skip </button>
      </div>
      <div className={styles.joinSearchbox}>
        <img src="/assets/search.svg" />

        <input type="text" placeholder="Search" />
      </div>
      <div className={styles.joinListContent}>
        <ul className="join__list">
          {data &&
            data.map((teams, index) => (
              <li key={teams + index} className={styles.joinListItem}>
                <img src="/assets/team1.png" />
                {teams.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Join;
