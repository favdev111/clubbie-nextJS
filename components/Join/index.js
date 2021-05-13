import React from "react";
import styles from './join.module.scss';


function Join({ title, data, current }) {
  return (
    <div className={styles.join}>
      <div className={styles.joinHeader}>
        <div className={styles.joinHeaderInner}>
          <button>
            <img src="/assets/back.svg" />
          </button>
          <h1> {title} </h1>
          {current && (
            <div className={styles.joinHeaderCurrent}>
              <img src="/assets/aondimentum.svg" />
              Aondimentum
            </div>
          )}
        </div>

        <button className={styles.button}> Skip </button>
      </div>
      <div className={styles.joinSearchbox}>
        <img src="/assets/search.svg" />

        <input type="text" placeholder="Search" />
      </div>
      <div className={styles.joinListContent}>
        <ul className="join__list">
          {data &&
            data.map((i) => (
              <li className={styles.joinListItem}>
                <img src="/assets/team1.png" />
                {i.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Join;
