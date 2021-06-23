import React, { useState } from "react";
import Cookie from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import CommonSearch from "@sub/search";
import LeftArrow from "@svg/left-arrow";
import HTTPClient from "@api/HTTPClient";
import Clubs from "@api/services/Clubs";
import Teams from "@api/services/Teams";
import styles from "./join.module.css";

function Join({ title, clubs, teams, selectedClub }) {
  const router = useRouter();

  const [listItems, setlistItems] = useState(clubs || teams);

  const filterList = (searchText) => {
    if (searchText.trim().length > 0) {
      const filtered = (clubs || teams).filter(
        (x) => x.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      );
      setlistItems(filtered);
      return;
    }
    setlistItems(clubs || teams);
  };

  const handleSearchTextChange = (e) => {
    filterList(e.target.value);
  };

  // join club and teams
  const handleItemClick = (item) => {
    if (clubs) {
      router.push(`/teamhub/join-club/${item.id}/join-team`);
      return;
    }
    if (selectedClub && teams) {
      const accessToken = Cookie.get("access_token");
      HTTPClient.setHeader("Authorization", `Bearer ${accessToken}`);

      Clubs.JoinClub(selectedClub.id)
        .then(() => {
          Teams.JoinTeam(item.id)
            .then(() => {
              router.push("/profile-self"); // redirect to profile
            })
            .catch((err) => {
              console.log("err joining team => ", err); // TODO: show error
            });
        })
        .catch((err) => {
          console.log("err joining club => ", err); // TODO: show error
        });
    }
  };

  return (
    <div className={styles.join}>
      {teams && selectedClub && (
        <div className={styles.mobileCurrent}>
          <div>
            <img src={selectedClub.crest || "/assets/aondimentum.svg"} />
            <p> {selectedClub.title}</p>
          </div>
        </div>
      )}
      <div className={styles.joinHeader}>
        <div className={styles.joinHeaderInner}>
          <a className={styles.back}>
            <button onClick={() => router.back()}>
              <LeftArrow />
            </button>
          </a>

          <h1> {title} </h1>
          {teams && selectedClub && (
            <div className={styles.joinHeaderCurrent}>
              <img src={selectedClub.crest || "/assets/aondimentum.svg"} />
              {selectedClub.title}
            </div>
          )}
        </div>

        <button className={styles.skip}> Skip </button>
      </div>

      <CommonSearch onChange={(e) => handleSearchTextChange(e)} />

      <div className={styles.joinListContent}>
        <ul className="join__list">
          {listItems &&
            listItems.map((item, index) => (
              <li
                key={item + index}
                className={styles.joinListItem}
                onClick={(e) => handleItemClick(item)}
              >
                <img src={item.crest || "/assets/team1.png"} />
                {item.title}
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
