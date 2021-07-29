import React, { useState, useEffect, useRef } from "react";
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

function JoinHeader({ teams, selectedClub, title }) {
  const router = useRouter();

  return (
    <>
      {teams && selectedClub && (
        <div className={styles.mobileCurrent}>
          <div>
            <img
              src={selectedClub?.crest || "/assets/club-badge-placeholder.png"}
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
              <Link href={`/clubs/${selectedClub?.id}`}>
                <a>
                  <img
                    src={
                      selectedClub?.crest ||
                      "/assets/club-badge-placeholder.png"
                    }
                    className={styles.selectedClubImage}
                  />
                  <span>{selectedClub?.title}</span>
                </a>
              </Link>
            </div>
          )}
        </div>

        <div className={styles.skipButtonWrapper}>
          <Link href="/profile/self">
            <a className={styles.skip}>Skip</a>
          </Link>
        </div>
      </div>
    </>
  );
}

function JoinSearch({
  searchClubs,
  searchTeams,
  registerMode,
  onSearchTextChange,
  onRegisterClick,
  loading,
  showOwnerShipText,
}) {
  const searchRef = useRef();

  const handleNextButtonClick = async () => {
    if (searchRef?.current && searchRef?.current?.value?.trim()?.length === 0) {
      searchRef?.current?.focus();
      return;
    }
    await onRegisterClick();
  };

  return (
    <>
      <CommonSearch
        placeholder={
          registerMode && searchClubs
            ? "Club Name"
            : registerMode && searchTeams
            ? "Team Name"
            : null
        }
        onChange={onSearchTextChange}
        inputRef={searchRef}
        onEnter={handleNextButtonClick}
      />
      {registerMode && (
        <div className={styles.clubAndTeamRegisteration}>
          <div className={styles.registerButton}>
            <Button onClick={handleNextButtonClick} loading={loading}>
              Next
            </Button>
          </div>
          {searchClubs && showOwnerShipText && (
            <p className={styles.registerText}>
              Or take ownership of an existing club
            </p>
          )}
        </div>
      )}
    </>
  );
}

function JoinList({
  listItems,
  handleItemClick,
  registerMode,
  listOfClubs,
  listOfTeams,
  selectedClub,
  listJoined,
}) {
  const [_listItems, setListItems] = useState(listItems);

  const isJoined = (itemId) => {
    const joined = listJoined?.find((x) => x?.id === itemId);
    if (joined) {
      return joined?.role;
    }
    return false;
  };

  useEffect(() => {
    const toSet = listItems?.map((x) => {
      return {
        ...x,
        joinRole: isJoined(x?.id),
      };
    });
    setListItems([...toSet]);
  }, [listItems]);

  return (
    <>
      {_listItems?.length > 0 ? (
        <div className={styles.joinListContent}>
          <ul className={"join__list"}>
            {_listItems?.map((item, index) => (
              <li
                key={item + index}
                className={styles.joinListItem}
                onClick={async () => await handleItemClick(item)}
              >
                <img
                  src={item?.crest || "/assets/club-badge-placeholder.png"}
                  className={styles.crestImage}
                />
                <span>{item?.title}</span>
                {item?.joinRole && (
                  <span className={styles.joinListItemJoinedByAuthUser}>
                    Joined as {item?.joinRole}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        !registerMode && (
          <div className={styles.joinListNoItems}>
            <p>
              Looks like there are no
              {(listOfClubs && " Clubs ") ||
                (listOfTeams && " Teams ") ||
                "Clubs/Teams"}
              registered{" "}
              {listOfTeams && selectedClub?.title && (
                <>
                  for
                  <Link href={`/clubs/${selectedClub?.id}`}>
                    <a>
                      {" "}
                      <span className={styles.joinListNoItemsClubName}>
                        {selectedClub?.title}
                      </span>{" "}
                    </a>
                  </Link>
                </>
              )}
              as of now. Care to make one of your own?.
              <Link
                href={
                  (listOfClubs && "/teamhub/register-club") ||
                  (listOfTeams &&
                    `/teamhub/register-club/${selectedClub?.id}/register-team`)
                }
              >
                <a>
                  <span className={styles.joinListNoItemsCTA}>
                    &ensp;Click Here
                  </span>
                </a>
              </Link>
            </p>
          </div>
        )
      )}
      <div className={styles.mobileButtons}>
        <Link href="/">
          <a>Go back</a>
        </Link>
        <Link href="/">
          <a>Skip</a>
        </Link>
      </div>
    </>
  );
}

function Join({
  title,
  clubs,
  teams,
  selectedClub,
  registerMode,
  clubsJoined,
  teamsJoined,
  hideList,
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [backdropLoading, setBackdropLoading] = useState(false);
  const [listItems, setlistItems] = useState(clubs || teams);
  const [listJoined] = useState(clubsJoined || teamsJoined);
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
    if (registerMode) {
      clubs && setNewClubTitle(e.target.value.trim());
      teams && setNewTeamTitle(e.target.value.trim());
    }
  };

  const handleItemClick = async (item) => {
    if (clubs) {
      setBackdropLoading(true);
      !registerMode && router.push(`/teamhub/join-club/${item?.id}/join-team`);
      registerMode &&
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

  const handleRegisterClick = async () => {
    if (!registerMode) return;

    if (clubs && newClubTitle?.length > 0) {
      // register new club
      setLoading(true);
      const payload = { title: newClubTitle };
      const responseClub = await Clubs.RegisterClub(payload).catch(() => null);
      const club = responseClub?.data;

      if (!club) {
        setLoading(false);
        showNotificationMsg("Could Not Register Club", {
          variant: "error",
          displayIcon: true,
        });
        return;
      }

      setLoading(false);
      showNotificationMsg(`You are now the owner of ${club?.title}`, {
        variant: "success",
        displayIcon: true,
      });
      router.push(`/teamhub/register-club/${club?.id}/register-team`);
      return;
    }
    if (teams && selectedClub && newTeamTitle?.length > 0) {
      // register new team for selected club
      setLoading(true);
      const payload = { title: newTeamTitle };
      const responseTeam = await Teams.RegisterTeam(
        selectedClub?.id,
        payload
      ).catch((e) => {
        return {
          error: {
            code: e.response.status,
            msg:
              e.response.status === 409
                ? "Team Already Exists"
                : "Could Not Register Team",
          },
        };
      });

      const team = responseTeam?.data;
      if (responseTeam?.error) {
        setLoading(false);
        showNotificationMsg(responseTeam?.error?.msg, {
          variant: "error",
          displayIcon: true,
        });
        return;
      }

      setLoading(false);
      showNotificationMsg(`You are now the owner of ${team?.title}`, {
        variant: "success",
        displayIcon: true,
      });
      router.push(`/profile/self`);
      return;
    }
  };

  return (
    <>
      {backdropLoading && <BackDropLoader />}
      <div className={styles.join}>
        <JoinHeader
          selectedClub={selectedClub}
          teams={teams}
          title={title}
        ></JoinHeader>
        <JoinSearch
          searchClubs={!!clubs}
          searchTeams={!!teams}
          registerMode={registerMode}
          onSearchTextChange={handleSearchTextChange}
          onRegisterClick={handleRegisterClick}
          loading={loading}
          showOwnerShipText={!hideList}
        ></JoinSearch>
        {!hideList && (
          <JoinList
            listOfClubs={!!clubs}
            listOfTeams={!!teams}
            listItems={listItems}
            listJoined={listJoined}
            handleItemClick={handleItemClick}
            registerMode={registerMode}
            selectedClub={selectedClub}
          ></JoinList>
        )}
      </div>
    </>
  );
}

export default Join;
