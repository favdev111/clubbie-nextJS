import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@sub/button";
import ActionButton from "@sub/action-button";
import ChatSVG from "@svg/messages";
import TickMarkSVG from "@svg/tick-mark";
import XMarkSVG from "@svg/x-mark";
import styles from "./teamDetails.module.css";

function TeamHeader({ teamCrest, teamTitle }) {
  return (
    <div className={styles.teamHeaderWrapper}>
      <div className={styles.teamCrestWrapper}>
        <img
          className={styles.teamCrest}
          src={teamCrest || "/assets/club-badge-placeholder.png"}
        />
        <span className={styles.teamClubCrestWrapper}>
          <img
            className={styles.teamClubCrest}
            src={teamCrest || "/assets/club-badge-placeholder.png"}
          />
        </span>
      </div>
      <div className={styles.teamHeaderDetailsWrapper}>
        <div className={styles.teamHeaderTitleWrapper}>
          <h1>{teamTitle}</h1>
          <span className={styles.teamHeaderAdminActionButtons}>
            <ActionButton type="settings" />
            <ActionButton type="edit" />
            <ActionButton type="chat" />
          </span>
        </div>
        <div className={styles.teamHeaderActionButtons}>
          <Button variant="success" size="medium">
            Join
          </Button>
          <Button variant="danger" size="medium">
            Leave
          </Button>
        </div>
      </div>
    </div>
  );
}

function TeamMemberCard({
  id,
  image,
  name,
  role,
  chatButton,
  acceptButton,
  declineButton,
}) {
  return (
    <div className={styles.teamMemberCard} key={id}>
      <Link href={`/profile/${id}`}>
        <a>
          <img src={image} className={styles.teamMemberImage} />
        </a>
      </Link>
      <div className={styles.teamMemberInfoWrapper}>
        <Link href={`/profile/${id}`}>
          <a>
            <span className={styles.teamMemberName}>{name}</span>
          </a>
        </Link>
        <span className={styles.teamMemberRole}>{role}</span>
      </div>
      <div className={styles.teamMemberActionButtons}>
        {chatButton && (
          <span>
            <ChatSVG />
          </span>
        )}
        {declineButton && (
          <span>
            <XMarkSVG />
          </span>
        )}
        {acceptButton && (
          <span>
            <TickMarkSVG />
          </span>
        )}
      </div>
    </div>
  );
}

function TeamMembers({ owner, coach, leader, players }) {
  const [_members, setMembers] = useState([]);

  useEffect(() => {
    const members = [];
    if (owner) {
      members.push({
        id: owner?.id || "Owner-ID",
        name: owner?.name || owner?.id || "Owner-ID",
        role: "Owner",
        image: owner?.image || "/assets/person-placeholder.jpg",
      });
    }
    if (coach) {
      members.push({
        id: coach?.id || "Coach-ID",
        name: coach?.name || coach?.id || "Coach-ID",
        role: "Coach",
        image: coach?.image || "/assets/person-placeholder.jpg",
      });
    }
    if (leader) {
      members.push({
        id: leader?.id || "Leader-ID",
        name: leader?.name || leader?.id || "Leader-ID",
        role: "Team Leader",
        image: leader?.image || "/assets/person-placeholder.jpg",
      });
    }
    if (players) {
      players?.map((player) => {
        members.push({
          id: player?.id || "Player-ID",
          name: player?.user?.name || player?.user?.id || "Player-ID",
          role: "Player",
          image: player?.image || "/assets/person-placeholder.jpg",
          status: player?.status || "Unset", // show green/red/yellow circles with box shadows and dropdown with unapproved etc
        });
      });
    }
    setMembers([...members]);
  }, [owner, coach, leader, players]);

  return (
    <div className={styles.teamMembersWrapper}>
      <h2>Members {_members?.length > 0 && `(${_members?.length})`}</h2>
      <div className={styles.teamMembers}>
        {_members.map((member) => (
          <>
            <TeamMemberCard
              id={member?.id}
              name={member?.name}
              image={member?.image}
              role={member?.role}
              chatButton={true}
            ></TeamMemberCard>
          </>
        ))}
      </div>
    </div>
  );
}

function TeamDetails({ team }) {
  return (
    <>
      <TeamHeader teamCrest={team?.crest} teamTitle={team?.title}></TeamHeader>
      <TeamMembers
        owner={team?.owner}
        coach={team?.coach}
        leader={team?.leader}
        players={team?.players}
      ></TeamMembers>
    </>
  );
}

export default TeamDetails;
