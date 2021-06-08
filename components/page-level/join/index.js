import React from "react";
import styles from "./join.module.css";
import Link from "next/link";
import CommonSearch from "@sub/search";

function Join({ title, data, current }) {
  return (
    <div className={styles.join}>
      {current && (
        <div className={styles.mobileCurrent}>
          <div>
            <img src="/assets/aondimentum.svg" />
            <p> Aondimentum</p>
          </div>
        </div>
      )}
      <div className={styles.joinHeader}>
        <div className={styles.joinHeaderInner}>
          <Link href="/">
            <a className={styles.back}>
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
      <CommonSearch />
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
      <div className={styles.mobileButtons}>
        <Link href="/">
          <a> Go back </a>
        </Link>
        <Link href="/">
          <a> Skip </a>
        </Link>
      </div>
    </div>
  );
}

export default Join;
