import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import CommonSearch from "@sub/search";
import Button from "@sub/button";
import LeftArrow from "@svg/left-arrow";
import HTTPClient from "@api/HTTPClient";
import Clubs from "@api/services/Clubs";
import Teams from "@api/services/Teams";
import auth from "@utils/helpers/auth";
import styles from "./join.module.css";

function Join({ title, clubs, teams, selectedClub, register }) {
  const router = useRouter();

  const [listItems, setlistItems] = useState(clubs || teams);
  const [newClubTitle, setNewClubTitle] = useState(null);
  const [newTeamTitle, setNewTeamTitle] = useState(null);

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
    if (register) {
      clubs && setNewClubTitle(e.target.value.trim());
      teams && setNewTeamTitle(e.target.value.trim());
    }
  };

  const handleItemClick = (item) => {
    if (clubs) {
      !register && router.push(`/teamhub/join-club/${item.id}/join-team`);
      register &&
        router.push(`/teamhub/register-club/${item.id}/register-team`);
      return;
    }
    if (selectedClub && teams) {
      const accessToken = auth.getAccessToken();
      HTTPClient.setHeader("Authorization", `Bearer ${accessToken}`);

      Clubs.JoinClub(selectedClub.id)
        .then(() => {
          Teams.JoinTeam(item.id)
            .then(() => {
              router.push("/profile/self"); // redirect to profile
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

  const handleRegisterClick = () => {
    if (!register) return;
    if (clubs && newClubTitle.length > 0) {
      // create a new club
      const accessToken = auth.getAccessToken();
      HTTPClient.setHeader("Authorization", `Bearer ${accessToken}`);

      Clubs.RegisterClub({
        title: newClubTitle,
      })
        .then((res) => {
          console.log("res createing club => ", res);
          const club = res.data;
          router.push(`/teamhub/register-club/${club.id}/register-team`);
        })
        .catch((err) => {
          console.log("err creating club => ", err); // TODO: show error
        });
    }
    if (teams && selectedClub && newTeamTitle.length > 0) {
      // create a new team
      const accessToken = auth.getAccessToken();
      HTTPClient.setHeader("Authorization", `Bearer ${accessToken}`);

      Teams.RegisterTeam(selectedClub.id, {
        title: newTeamTitle,
      })
        .then((res) => {
          console.log("res creating team => ", res);
          const team = res.data;
          router.push(`/profile/self`); // TODO: show success msg
        })
        .catch((err) => {
          console.log("err creating team => ", err); // TODO: show error
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

      <CommonSearch
        placeholder={
          register && clubs
            ? "Club Name"
            : register && teams
            ? "Team Name"
            : null
        }
        onChange={(e) => handleSearchTextChange(e)}
      />

      {register && (
        <div>
          <div className={styles.registerButton}>
            <Button onClick={handleRegisterClick}>Next</Button>
          </div>
          {clubs && (
            <p className={styles.registerText}>
              Or take owner ship of an existing club
            </p>
          )}
        </div>
      )}

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
