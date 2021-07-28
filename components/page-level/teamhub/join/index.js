import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import CommonSearch from "@sub/search";
import Button from "@sub/button";
import useNotification from "@sub/hook-notification";
import BackDropLoader from "@sub/backdrop-loader";
import LeftArrow from "@svg/left-arrow";
import Clubs from "@api/services/Clubs";
import Teams from "@api/services/Teams";
import styles from "./join.module.css";

function Join({ title, clubs, teams, selectedClub, register }) {
  const router = useRouter();

  const [backdropLoading, setBackdropLoading] = useState(false);
  const [listItems, setlistItems] = useState(clubs || teams);
  const [newClubTitle, setNewClubTitle] = useState(null);
  const [newTeamTitle, setNewTeamTitle] = useState(null);

  const { showNotificationMsg } = useNotification();

  const filterList = (searchText) => {
    if (searchText?.trim().length > 0) {
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

  const handleItemClick = async (item) => {
    if (clubs) {
      setBackdropLoading(true);
      !register && router.push(`/teamhub/join-club/${item?.id}/join-team`);
      register &&
        router.push(`/teamhub/register-club/${item?.id}/register-team`);
      setBackdropLoading(false);
      return;
    }
    if (selectedClub && teams) {
      // join club
      const responseClub = await Clubs.JoinClub(selectedClub?.id).catch(
        () => null
      );
      if (!responseClub) {
        showNotificationMsg("Could Not Join Club", {
          variant: "error",
          displayIcon: true,
        });
        return;
      }

      // join team of club
      const responseTeam = await Teams.JoinTeam(item?.id).catch(() => null);
      if (!responseTeam) {
        showNotificationMsg("Could Not Join Team", {
          variant: "error",
          displayIcon: true,
        });
        return;
      }
      showNotificationMsg(
        `${
          responseTeam?.data?.title
            ? "You are now a member of " +
              responseTeam?.data?.title.toUpperCase()
            : "Team Joined Successfully..!"
        }`,
        {
          variant: "success",
          displayIcon: true,
        }
      );
      router.push("/profile/self"); // redirect to profile
    }
  };

  const handleRegisterClick = () => {
    if (!register) return;
    if (clubs && newClubTitle?.length > 0) {
      // create a new club
      Clubs.RegisterClub({
        title: newClubTitle,
      })
        .then((res) => {
          console.log("res createing club => ", res);
          const club = res.data;
          router.push(`/teamhub/register-club/${club?.id}/register-team`);
        })
        .catch((err) => {
          console.log("err creating club => ", err); // TODO: show error
        });
    }
    if (teams && selectedClub && newTeamTitle?.length > 0) {
      // create a new team
      Teams.RegisterTeam(selectedClub?.id, {
        title: newTeamTitle,
      })
        .then((res) => {
          console.log("res creating team => ", res);
          // const team = res.data;
          router.push(`/profile/self`); // TODO: show success msg
        })
        .catch((err) => {
          console.log("err creating team => ", err); // TODO: show error
        });
    }
  };

  return (
    <>
      {backdropLoading && <BackDropLoader />}
      <div className={styles.join}>
        {teams && selectedClub && (
          <div className={styles.mobileCurrent}>
            <div>
              <img
                src={
                  selectedClub?.crest || "/assets/club-badge-placeholder.png"
                }
              />
              <p> {selectedClub?.title}</p>
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
                <img
                  src={
                    selectedClub?.crest || "/assets/club-badge-placeholder.png"
                  }
                  className={styles.selectedClubImage}
                />
                {selectedClub?.title}
              </div>
            )}
          </div>

          <div className={styles.skipButtonWrapper}>
            <Link href="/profile/self">
              <a className={styles.skip}>Skip</a>
            </Link>
          </div>
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
          <ul className={"join__list"}>
            {listItems &&
              listItems.map((item, index) => (
                <li
                  key={item + index}
                  className={styles.joinListItem}
                  onClick={async () => await handleItemClick(item)}
                >
                  <img
                    src={item?.crest || "/assets/club-badge-placeholder.png"}
                    className={styles.crestImage}
                  />
                  {item?.title}
                </li>
              ))}
          </ul>
        </div>
        <div className={styles.mobileButtons}>
          <Link href="/">
            <a>Go back</a>
          </Link>
          <Link href="/">
            <a>Skip</a>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Join;
