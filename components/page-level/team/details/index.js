import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@sub/button";
import ActionButton from "@sub/action-button";
import ConfirmDialog from "@sub/confirm-dialog";
import useNotification from "@sub/hook-notification";
import ChatSVG from "@svg/messages";
import TickMarkSVG from "@svg/tick-mark";
import XMarkSVG from "@svg/x-mark";
import Clubs from "@api/services/Clubs";
import Teams from "@api/services/Teams";
import styles from "./teamDetails.module.css";

function TeamHeader({
  clubId,
  clubCrest,
  teamId,
  teamCrest,
  teamTitle,
  showNotificationMsg,
  joinButton,
  leaveButton,
  onMemberJoin,
  onMemberLeave,
  isTeamOwner,
}) {
  const [joiningTeam, setJoiningTeam] = useState(false);
  const [leaveTeamConfirm, setLeaveTeamConfirm] = useState(false);
  const [leavingTeam, setLeavingTeam] = useState(false);

  const handleJoinClick = async () => {
    setJoiningTeam(true);
    // join club
    const responseClub = await Clubs.JoinClub(clubId).catch(() => null);
    if (!responseClub) {
      showNotificationMsg("Could Not Join Team's Club", {
        variant: "error",
        displayIcon: true,
      });
      setJoiningTeam(false);
      return;
    }

    // join team of club
    const responseTeam = await Teams.JoinTeam(teamId).catch(() => null);
    if (!responseTeam) {
      showNotificationMsg("Could Not Join Team", {
        variant: "error",
        displayIcon: true,
      });
      setJoiningTeam(false);
      return;
    }
    await onMemberJoin();
    showNotificationMsg(
      `${
        responseTeam?.data?.title
          ? "You are now a member of " + responseTeam?.data?.title.toUpperCase()
          : "Team Joined Successfully..!"
      }`,
      {
        variant: "success",
        displayIcon: true,
      }
    );
    setJoiningTeam(false);
  };

  const handleLeaveClick = async () => {
    setLeavingTeam(true);

    const response = await Teams.LeaveTeam(teamId).catch(() => null);
    if (!response) {
      showNotificationMsg("Could Not Leave Team", {
        variant: "error",
        displayIcon: true,
      });
      setLeavingTeam(false);
      return;
    }
    await onMemberLeave();
    showNotificationMsg("Team Left Successfully..!", {
      variant: "success",
      displayIcon: true,
    });
    setLeavingTeam(false);
  };

  return (
    <>
      <ConfirmDialog
        open={leaveTeamConfirm}
        setOpen={setLeaveTeamConfirm}
        message={
          isTeamOwner
            ? "Are you sure to leave this team? You will still be the Owner of this Team."
            : "Are you sure to leave this team? You might miss out on current events, feed, group chat and more."
        }
        confirmText={"Leave"}
        onConfirm={handleLeaveClick}
        type={"danger"}
      />
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
            {joinButton && (
              <Button
                variant="success"
                size="medium"
                onClick={handleJoinClick}
                loading={joiningTeam}
              >
                {isTeamOwner ? "Join as Player" : "Join"}
              </Button>
            )}
            {leaveButton && (
              <Button
                variant="danger"
                size="medium"
                onClick={() => setLeaveTeamConfirm(true)}
                loading={leavingTeam}
              >
                {isTeamOwner ? "Leave as Player" : "Leave"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
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

function TeamMembers({ members }) {
  return (
    <div className={styles.teamMembersWrapper}>
      <h2>Members {members?.length > 0 && `(${members?.length})`}</h2>
      {members?.length > 0 && (
        <div className={styles.teamMembers}>
          {members?.map((member) => (
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
      {members?.length === 0 && (
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

function TeamJoinRequests({ requests }) {
  return (
    <div className={styles.teamJoinRequestsWrapper}>
      <h2>Join Requests {requests?.length > 0 && `(${requests?.length})`}</h2>
      {requests?.length > 0 && (
        <div className={styles.teamJoinRequests}>
          {requests?.map((member) => (
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
      {requests?.length === 0 && (
        <div className={styles.teamJoinRequestsNone}>
          No New requests for now
        </div>
      )}
    </div>
  );
}

function TeamDetails({ user, team }) {
  const { showNotificationMsg } = useNotification();
  console.log("user => ", user);

  const [_members, setMembers] = useState([]);
  const [_isOwner, setIsOwner] = useState(false);
  const [_isCoach, setIsCoach] = useState(false);
  const [_isLeader, setIsLeader] = useState(false);
  const [_isPlayer, setIsPlayer] = useState(false);

  useEffect(() => {
    const members = [];
    const { owner, coach, leader, players } = team;

    // set members
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
          status: player?.status || "unapproved", // show green/red/yellow circles with box shadows and dropdown with unapproved etc
        });
      });
    }

    // set user authority
    if (owner?.id === user?.id) setIsOwner(true);
    if (coach?.id === user?.id) setIsCoach(true);
    if (leader?.id === user?.id) setIsLeader(true);
    if (players?.find((x) => x?.user?.id === user?.id)) setIsPlayer(true);

    setMembers([...members]);
  }, [team]);

  const addUserToTeamPlayers = () => {
    const foundPlayer = _members?.find((x) => x?.id === user?.id);
    if (!foundPlayer) {
      const toSet = [..._members];
      toSet.push({
        id: user?.id || "Player-ID",
        name: user?.profile?.fullName || user?.id || "Player-ID",
        role: "Player",
        image: user?.profile?.image || "/assets/person-placeholder.jpg",
        status: "unapproved", // show green/red/yellow circles with box shadows and dropdown with unapproved etc
      });
      setMembers([...toSet]);
    }
    setIsPlayer(true);
  };

  const removeUserFromTeamPlayers = () => {
    const toSet = _members?.filter((x) => x?.id !== user?.id);
    setMembers([...toSet]);
    setIsPlayer(false);
  };

  return (
    <>
      <TeamHeader
        clubId={team?.club?.id}
        clubCrest={team?.club?.crest}
        teamId={team?.id}
        teamCrest={team?.crest}
        teamTitle={team?.title}
        showNotificationMsg={showNotificationMsg}
        joinButton={!_isPlayer}
        leaveButton={_isPlayer}
        isTeamOwner={_isOwner}
        onMemberJoin={addUserToTeamPlayers}
        onMemberLeave={removeUserFromTeamPlayers}
      ></TeamHeader>
      <TeamMembers members={_members}></TeamMembers>
      <TeamSubscriptionPlans
        plans={team?.subscriptionPlans}
      ></TeamSubscriptionPlans>
      <TeamJoinRequests
        requests={_members
          ?.map((x) => (x?.status?.toLowerCase() === "unapproved" ? x : null))
          .filter((y) => y)}
      ></TeamJoinRequests>
    </>
  );
}

export default TeamDetails;
