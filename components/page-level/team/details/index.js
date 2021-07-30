import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@sub/button";
import ActionButton from "@sub/action-button";
import ChatSVG from "@svg/messages";
import TickMarkSVG from "@svg/tick-mark";
import XMarkSVG from "@svg/x-mark";
import styles from "./teamDetails.module.css";

function TeamHeader({ clubCrest, teamCrest, teamTitle }) {
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
            src={clubCrest || "/assets/club-badge-placeholder.png"}
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
          id: player?.user?.id || "Player-ID",
          name: player?.user?.name || player?.user?.id || "Player-ID",
          role: "Player",
          image: player?.user?.image || "/assets/person-placeholder.jpg",
          status: player?.status || "Unset", // show green/red/yellow circles with box shadows and dropdown with unapproved etc
        });
      });
    }
    setMembers([...members]);
  }, [owner, coach, leader, players]);

  return (
    <div className={styles.teamMembersWrapper}>
      <h2>Members {_members?.length > 0 && `(${_members?.length})`}</h2>
      {_members?.length > 0 && (
        <div className={styles.teamMembers}>
          {_members?.map((member) => (
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
      )}
      {_members?.length === 0 && (
        <div className={styles?.teamMembersNone}>
          This team has no members currently.
          <span>&nbsp;Wanna Join?&nbsp;</span> Click the Join Button above.
        </div>
      )}
    </div>
  );
}

function TeamSubscriptionPlanCard({
  planId,
  planName,
  planAmount,
  planCurrencySymbol,
  planInterval,
  isSubscribed,
}) {
  return (
    <div className={styles.teamSubscriptionPlanCard} key={planId}>
      <div className={styles.teamSubscriptionPlanInfoWrapper}>
        <span className={styles.teamSubscriptionPlanName}>{planName}</span>
        <span className={styles.teamSubscriptionPlanPriceWrapper}>
          Starting at&ensp;
          <span className={styles.teamSubscriptionPlanPrice}>
            {planAmount.toFixed(2)} {planCurrencySymbol}/ {planInterval}
          </span>
        </span>
      </div>
      <div className={styles.teamSubscriptionPlanActions}>
        {isSubscribed && (
          <span className={styles.teamSubscriptionPlanActive}>Subscribed</span>
        )}
      </div>
    </div>
  );
}

function TeamSubscriptionPlans({ plans }) {
  const [_plans, setPlans] = useState([]);

  useEffect(() => {
    const toSet = [];
    plans?.map((x) => {
      toSet.push({
        type: x?.type,
        id: x?.id,
        amount: x?.amount,
        active: x?.active,
        // add these fields in api response
        isSubscribed: true,
        currency: "£",
        interval: "Month",
      });
    });
    setPlans([...toSet]);
  }, [plans]);

  const planName = (planType) => {
    if (planType?.includes("free")) return `FREE Subscription`;
    if (planType?.includes("basic")) return `Basic Subscription`;
    return "Team Subscription Plan";
  };

  return (
    <div className={styles.teamSubscriptionPlansWrapper}>
      <h2>Subscription Plans {_plans?.length > 0 && `(${_plans?.length})`}</h2>
      <div className={styles.teamSubscriptionPlans}>
        {_plans.map(
          (plan) =>
            plan?.active && (
              <TeamSubscriptionPlanCard
                planId={plan?.id || plan?._id}
                planName={planName(plan?.type)}
                planAmount={plan?.amount}
                planCurrencySymbol={plan?.currency}
                planInterval={plan?.interval}
                isSubscribed={plan?.isSubscribed}
              ></TeamSubscriptionPlanCard>
            )
        )}
      </div>
      <div className={styles.teamSubscriptionPlanUsageInfo}>
        {_plans?.length > 0 ? (
          <>
            <span>Whats the benefit?</span>&ensp;You get access to specific team
            events free of charge and more.
          </>
        ) : (
          <>
            <span>No Plans Offered.</span>&ensp;This team does not offer any
            subscription plan currently.
          </>
        )}
      </div>
      {_plans?.length > 0 && (
        <div className={styles.teamSubscriptionPlanCTA}>
          Contact your Teamleader to add you to a subscription plan
        </div>
      )}
    </div>
  );
}

function TeamJoinRequests({ players }) {
  const [_joinRequests, setJoinRequests] = useState([]);

  useEffect(() => {
    const toSet = [];
    players?.map((x) => {
      if (x?.status === "unapproved") {
        toSet.push({
          id: x?.user?.id || "Player-ID",
          name: x?.user?.name || x?.user?.name || "Playername",
          image: x?.user?.image || "/assets/person-placeholder.jpg",
          role: "Player",
          status: x?.status || "Unapproved",
        });
      }
    });
    setJoinRequests([...toSet]);
  }, [players]);

  return (
    <div className={styles.teamJoinRequestsWrapper}>
      <h2>
        Join Requests{" "}
        {_joinRequests?.length > 0 && `(${_joinRequests?.length})`}
      </h2>
      {_joinRequests?.length > 0 && (
        <div className={styles.teamJoinRequests}>
          {_joinRequests?.map((member) => (
            <>
              <TeamMemberCard
                id={member?.id}
                name={member?.name}
                image={member?.image}
                role={member?.role}
                acceptButton={true}
                declineButton={true}
              ></TeamMemberCard>
            </>
          ))}
        </div>
      )}
      {_joinRequests?.length === 0 && (
        <div className={styles.teamJoinRequestsNone}>
          No New requests for now
        </div>
      )}
    </div>
  );
}

function TeamDetails({ team }) {
  return (
    <>
      <TeamHeader
        clubCrest={team?.club?.crest}
        teamCrest={team?.crest}
        teamTitle={team?.title}
      ></TeamHeader>
      <TeamMembers
        owner={team?.owner}
        coach={team?.coach}
        leader={team?.leader}
        players={team?.players}
      ></TeamMembers>
      <TeamSubscriptionPlans
        plans={team?.subscriptionPlans}
      ></TeamSubscriptionPlans>
      <TeamJoinRequests players={team?.players}></TeamJoinRequests>
    </>
  );
}

export default TeamDetails;
