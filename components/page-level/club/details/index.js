import React, { useState, useEffect } from "react";
import cn from "classnames";
import Link from "next/link";
import Button from "@sub/button";
import ActionButton from "@sub/action-button";
import useNotification from "@sub/hook-notification";
import ChatSVG from "@svg/messages";
import styles from "./clubDetails.module.css";

function ClubHeader({
  clubId,
  clubCrest,
  clubName,
  showNotificationMsg,
  joinButton,
  leaveButton,
  isOwner,
  isOfficial,
}) {
  return (
    <>
      <div className={styles.clubHeaderWrapper}>
        <div>
          <div className={styles.clubCrestWrapper}>
            <img
              className={styles.clubCrest}
              src={clubCrest || "/assets/club-badge-placeholder.png"}
            />
          </div>
        </div>
        <div className={styles.clubHeaderDetailsWrapper}>
          <div className={styles.clubHeaderTitleWrapper}>
            <h1>{clubName}</h1>
            <span className={styles.clubHeaderAdminActionButtons}>
              {isOwner && (
                <Link href={`/clubs/${clubId}/edit`}>
                  <a>
                    <ActionButton type="edit" />
                  </a>
                </Link>
              )}
            </span>
          </div>
          <div className={styles.clubHeaderActionButtons}>
            {joinButton && (
              <Button variant="success" size="medium">
                {isOwner || isOfficial ? "Join as Player" : "Join"}
              </Button>
            )}
            {leaveButton && (
              <Button variant="danger" size="medium">
                {isOwner || isOfficial ? "Leave as Player" : "Leave"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function ClubMemberCard({ id, image, name, roles, chatButton }) {
  return (
    <div className={styles.clubMemberCard} key={id}>
      <Link href={`/profile/${id}`}>
        <a>
          <img src={image} className={styles.clubMemberImage} />
        </a>
      </Link>
      <div className={styles.clubMemberInfoWrapper}>
        <Link href={`/profile/${id}`}>
          <a>
            <span className={styles.clubMemberName}>{name}</span>
          </a>
        </Link>
        <div className={styles.clubMemberRolesWrapper}>
          {roles?.map((role) => (
            <span className={styles.clubMemberRole}>{role}</span>
          ))}
        </div>
      </div>
      <div className={styles.clubMemberActionButtons}>
        {chatButton && (
          <span>
            <ChatSVG />
          </span>
        )}
      </div>
    </div>
  );
}

function ClubMembers({ members, membership }) {
  return (
    <div className={styles.clubMembersBlock}>
      {membership?.status && membership?.statusText && (
        <div className={styles.clubMembershipWrapper}>
          <span className={styles.clubMembershipStatusWrapper}>
            Membership
            <span
              className={cn(
                styles.clubMembershipStatus,
                ["active", "owner"].includes(
                  membership?.status?.toLowerCase()
                ) && styles.activeMemberShip,
                membership.status?.toLowerCase() === "suspended" &&
                  styles.suspendedMemberShip,
                membership.status?.toLowerCase() === "unapproved" &&
                  styles.unapprovedMemberShip
              )}
            >
              {membership.statusText}
            </span>
          </span>
        </div>
      )}
      <div className={styles.clubMembersWrapper}>
        <h2>Members {members?.length > 0 && `(${members?.length})`}</h2>
        {members?.length > 0 && (
          <div className={styles.clubMembers}>
            {members?.map((member) => (
              <>
                <ClubMemberCard
                  id={member?.id}
                  name={member?.name}
                  image={member?.image}
                  roles={member?.roles}
                  chatButton={true}
                ></ClubMemberCard>
              </>
            ))}
          </div>
        )}
        {members?.length === 0 && (
          <div className={styles.clubMembersNone}>
            This Club has no members currently.
            <span>&nbsp;Wanna Join?&nbsp;</span> Click the Join Button above.
          </div>
        )}
      </div>
    </div>
  );
}

function ClubTeamCard({ id, title, crest }) {
  return (
    <div className={styles.clubTeamCard} key={id}>
      <Link href={`/teams/${id}`}>
        <a>
          <img src={crest} className={styles.clubTeamImage} />
        </a>
      </Link>
      <div className={styles.clubTeamInfoWrapper}>
        <Link href={`/teams/${id}`}>
          <a>
            <span className={styles.clubTeamName}>{title}</span>
          </a>
        </Link>
      </div>
    </div>
  );
}

function ClubTeams({ teams, isOwner }) {
  return (
    <div className={styles.clubTeamsBlock}>
      <div className={styles.clubTeamsWrapper}>
        <h2>Teams {teams?.length > 0 && `(${teams?.length})`}</h2>
        {teams?.length > 0 && (
          <div className={styles.clubTeams}>
            {teams?.map((team) => (
              <>
                <ClubTeamCard
                  id={team?.id}
                  title={team?.title}
                  crest={team?.crest}
                ></ClubTeamCard>
              </>
            ))}
          </div>
        )}
        {teams?.length === 0 && (
          <div className={styles.clubTeamsNone}>
            This Club has no teams currently.
            {isOwner && (
              <>
                <span>&nbsp;Wanna Create One?&nbsp;</span> Click the manage icon
                above.
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ClubDetails({ user, club }) {
  const { showNotificationMsg } = useNotification();

  const [_club] = useState(club);
  const [_members, setMembers] = useState([]);
  const [_isOwner, setIsOwner] = useState(false);
  const [_isOfficial, setIsOfficial] = useState(false);
  const [_isPlayer, setIsPlayer] = useState(false);
  const [_membership, setMembership] = useState({
    status: null,
    statusText: null,
  });
  const [_clubTeams, setClubTeams] = useState([]);

  useEffect(() => {
    const members = [];
    const clubTeams = [];
    const { owner, officials, players, teams } = _club;

    // set members
    if (owner) {
      members.push({
        id: owner?.id || "Owner-ID",
        name: owner?.profile?.fullName || owner?.id || "Owner-ID",
        roles: ["Owner"],
        image: owner?.profile?.image || "/assets/person-placeholder.jpg",
      });
    }
    if (officials) {
      officials?.map((official) => {
        const foundMember = members.find((x) => x?.id === official?.user?.id);
        if (foundMember) {
          foundMember?.roles?.push(official?.role);
        } else {
          members.push({
            id: official?.user?.id || "Official-ID",
            name:
              official?.user?.profile?.fullName ||
              official?.user?.id ||
              "Official-ID",
            roles: [official?.role],
            image:
              official?.user?.profile?.image ||
              "/assets/person-placeholder.jpg",
          });
        }
      });
    }
    if (players) {
      players?.map((player) => {
        const foundMember = members.find((x) => x?.id === player?.id);
        if (foundMember) {
          foundMember?.roles?.push("Player");
        } else {
          members.push({
            id: player?.id || "Player-ID",
            name: player?.profile?.fullName || player?.id || "Player-ID",
            roles: ["Player"],
            image: player?.profile?.image || "/assets/person-placeholder.jpg",
          });
        }
      });
    }
    setMembers([...members]);

    // set user authority
    if (owner?.id === user?.id) {
      setMembership({ status: "owner", statusText: "Owner" });
      setIsOwner(true);
    }
    const foundOfficial = officials?.find((x) => x?.user?.id === user?.id);
    if (foundOfficial) {
      setMembership({ status: "official", statusText: "Official" });
      setIsOfficial(true);
    }
    const foundPlayer = players?.find((x) => x?.id === user?.id);
    if (foundPlayer) {
      setIsPlayer(true);
    }

    // set teams
    if (teams) {
      teams?.map((team) => {
        clubTeams.push({
          id: team?.id || "Team-ID",
          title: team?.title || team?.id || "Team-Title",
          crest: team?.crest || "/assets/club-badge-placeholder.png",
        });
      });
    }
    setClubTeams([...clubTeams]);
  }, [_club]);

  return (
    <>
      <ClubHeader
        clubId={_club?.id}
        clubCrest={_club?.crest}
        clubName={_club?.title}
        showNotificationMsg={showNotificationMsg}
        joinButton={!_isPlayer}
        leaveButton={_isPlayer}
        isOwner={_isOwner}
        isOfficial={_isOfficial}
      ></ClubHeader>
      <ClubMembers members={_members} membership={_membership}></ClubMembers>
      <ClubTeams teams={_clubTeams} isOwner={_isOwner}></ClubTeams>
    </>
  );
}

export default ClubDetails;
