import React, { useState, useEffect } from "react";
import cn from "classnames";
import Link from "next/link";
import Button from "@sub/button";
import TemplateSelect from "@sub/selectbox";
import TemplateInput from "@sub/input";
import Alert from "@sub/alert";
import ActionButton from "@sub/action-button";
import ConfirmDialog from "@sub/confirm-dialog";
import ContentDialog from "@sub/content-dialog";
import useNotification from "@sub/hook-notification";
import useForm from "@sub/hook-form";
import ChatSVG from "@svg/messages";
import TickMarkSVG from "@svg/tick-mark";
import XMarkSVG from "@svg/x-mark";
import PlusTurkSVG from "@svg/plus-turk";
import Clubs from "@api/services/Clubs";
import Teams from "@api/services/Teams";
import styles from "./teamDetails.module.css";
import { addSubcriptionPlan as addSubcriptionPlanSchema } from "@utils/schemas/team.schema";

function TeamHeader({
  clubId,
  clubCrest,
  clubName,
  teamId,
  teamCrest,
  teamTitle,
  showNotificationMsg,
  joinButton,
  leaveButton,
  onMemberJoin,
  onMemberLeave,
  isCoach,
  isLeader,
  isOwner,
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

    await onMemberLeave();
    const response = await Teams.LeaveTeam(teamId).catch(() => null);
    if (!response) {
      showNotificationMsg("Could Not Leave Team", {
        variant: "error",
        displayIcon: true,
      });
      setLeavingTeam(false);
      return;
    }
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
        message={`Are you sure to leave this team${
          (isLeader || isCoach || isOwner) && " as a Player"
        }?${
          isLeader || isCoach || isOwner
            ? ` You will still retain your role as a ${
                (isLeader &&
                  isCoach &&
                  isOwner &&
                  "Team Leader, a Coach and Team Owner") ||
                (isLeader && isCoach && "Team Leader and a Coach") ||
                (isOwner && isCoach && "Team Owner and a Coach") ||
                (isOwner && "Team Owner") ||
                (isLeader && "Team Leader") ||
                (isCoach && "Team Coach")
              }`
            : " You might miss out on current events, feed, group chat and more."
        }`}
        confirmText={"Leave"}
        onConfirm={handleLeaveClick}
        type={"danger"}
      />
      <div className={styles.teamHeaderWrapper}>
        <div>
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
          {clubName && (
            <div className={styles.teamParentClubNameWrapper}>
              Owned by&nbsp;
              <Link href={`/clubs/${clubId}`}>
                <a>
                  <span className={styles.teamParentClubName}>{clubName}</span>
                </a>
              </Link>
            </div>
          )}
        </div>
        <div className={styles.teamHeaderDetailsWrapper}>
          <div className={styles.teamHeaderTitleWrapper}>
            <h1>{teamTitle}</h1>
            <span className={styles.teamHeaderAdminActionButtons}>
              <ActionButton type="settings" />
              {isOwner && (
                <Link href={`/teams/${teamId}/edit`}>
                  <a>
                    <ActionButton type="edit" />
                  </a>
                </Link>
              )}
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
                {isOwner || isCoach || isLeader ? "Join as Player" : "Join"}
              </Button>
            )}
            {leaveButton && (
              <Button
                variant="danger"
                size="medium"
                onClick={() => setLeaveTeamConfirm(true)}
                loading={leavingTeam}
              >
                {isOwner || isCoach || isLeader ? "Leave as Player" : "Leave"}
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
  roles,
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
        <div className={styles.teamMemberRolesWrapper}>
          {roles?.map((role) => (
            <span className={styles.teamMemberRole}>{role}</span>
          ))}
        </div>
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

function TeamMembers({ members, membership }) {
  return (
    <div className={styles.teamMembersBlock}>
      {membership?.status && membership?.statusText && (
        <div className={styles.teamMembershipWrapper}>
          <span className={styles.teamMembershipStatusWrapper}>
            Membership
            <span
              className={cn(
                styles.teamMembershipStatus,
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
                  roles={member?.roles}
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
    </div>
  );
}

function AddTeamSubscription({
  teamId,
  onCloseClick,
  showNotificationMsg,
  onPlanAdded,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { register, handleSubmit, errors, setValue } = useForm({
    schema: addSubcriptionPlanSchema,
  });

  const onSubmit = async (data) => {
    setLoading(true);

    const payload = { amount: data?.amount };
    const response = await Teams.AddSubscriptionPlan(teamId, payload).catch(
      () => null
    );

    const planAdded = response?.data?.subscriptionPlans?.find(
      (x) => x?.type === "basic"
    );
    if (!response || !planAdded) {
      setError("Error: Could Not Add Subcription Plan");
      setLoading(false);
      return;
    }

    onPlanAdded(planAdded);
    onCloseClick();
    showNotificationMsg("Plan Added Successfully..!", {
      variant: "success",
      displayIcon: true,
    });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.addTeamSubscriptionWrapper}>
        <TemplateSelect
          placeholder="Select Plan Type"
          options={["Basic"]}
          selected="Basic"
          disabled={true}
          className={styles.addTeamSubscriptionSelectInput}
        />
        <TemplateSelect
          placeholder="Select Plan interval"
          options={["Monthly"]}
          selected="Monthly"
          disabled={true}
          className={styles.addTeamSubscriptionSelectInput}
        />
        <TemplateInput
          placeholder="Amount Per Interval"
          name="amount"
          customProps={{ ...register("amount") }}
          hint={
            errors?.amount && {
              type: "error",
              msg: errors?.amount?.message,
              inputBorder: true,
            }
          }
        />
        {error && (
          <div className={styles.addTeamSubscriptionErrorBox}>
            <Alert variant="error" text={error} />
          </div>
        )}
        <div className={styles.addTeamSubscriptionActionButtons}>
          <Button
            variant="transparent"
            size="medium"
            onClick={() => onCloseClick()}
          >
            Cancel
          </Button>
          <Button variant="info" size="medium" loading={loading}>
            Add
          </Button>
        </div>
      </div>
    </form>
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

function TeamSubscriptionPlans({
  teamId,
  plans,
  showNotificationMsg,
  isOwner,
  isLeader,
}) {
  const [_plans, setPlans] = useState([]);
  const [addTeamSubscriptionPlan, setAddTeamSubscriptionPlan] = useState(false);

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

  const onPlanAdded = (planAdded) => {
    const toSet = [..._plans];
    toSet.push({
      type: planAdded?.type,
      id: planAdded?.id,
      amount: planAdded?.amount,
      active: planAdded?.active,
      // add these fields in api response
      isSubscribed: true,
      currency: "£",
      interval: "Month",
    });
    setPlans([...toSet]);
  };

  return (
    <>
      <ContentDialog
        open={addTeamSubscriptionPlan}
        setOpen={setAddTeamSubscriptionPlan}
        title={"Add Team Subscription"}
        hideActionButtons={true}
        Body={() => (
          <AddTeamSubscription
            teamId={teamId}
            onCloseClick={() => setAddTeamSubscriptionPlan(false)}
            showNotificationMsg={showNotificationMsg}
            onPlanAdded={onPlanAdded}
          />
        )}
        className={styles.addTeamSubscriptionContentDialog}
      ></ContentDialog>
      <div className={styles.teamSubscriptionPlansWrapper}>
        <div className={styles.teamSubscriptionPlansHeaderWrapper}>
          <h2>
            Subscription Plans {_plans?.length > 0 && `(${_plans?.length})`}
          </h2>
          {(isOwner || isLeader) &&
            !_plans?.find((x) => x?.type.toLowerCase() === "basic") && (
              <span
                className={styles.addSubscriptionPlan}
                onClick={() => setAddTeamSubscriptionPlan(true)}
              >
                <PlusTurkSVG />
              </span>
            )}
        </div>
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
              <span>Whats the benefit?</span>&ensp;You get access to specific
              team events free of charge and more.
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
    </>
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

  const [_team] = useState(team);
  const [_members, setMembers] = useState([]);
  const [_isOwner, setIsOwner] = useState(false);
  const [_isCoach, setIsCoach] = useState(false);
  const [_isLeader, setIsLeader] = useState(false);
  const [_isPlayer, setIsPlayer] = useState(false);
  const [_membership, setMembership] = useState({
    status: null,
    statusText: null,
  });

  useEffect(() => {
    const members = [];
    const { owner, coach, leader, players } = _team;

    // set members
    if (coach) {
      members.push({
        id: coach?.id || "Coach-ID",
        name: coach?.name || coach?.id || "Coach-ID",
        roles: ["Coach"],
        image: coach?.image || "/assets/person-placeholder.jpg",
      });
    }
    if (leader) {
      const foundMember = members.find((x) => x?.id === leader?.id);
      if (foundMember) {
        foundMember?.roles?.push("Team Leader");
      } else {
        members.push({
          id: leader?.id || "Leader-ID",
          name: leader?.name || leader?.id || "Leader-ID",
          roles: ["Team Leader"],
          image: leader?.image || "/assets/person-placeholder.jpg",
        });
      }
    }
    if (players) {
      players?.map((player) => {
        if (player?.status !== "left") {
          const foundMember = members.find((x) => x?.id === player?.user?.id);
          if (foundMember) {
            foundMember?.roles?.push("Player");
          } else {
            members.push({
              id: player?.user?.id || "Player-ID",
              name: player?.user?.name || player?.user?.id || "Player-ID",
              roles: ["Player"],
              image: player?.user?.image || "/assets/person-placeholder.jpg",
              status: player?.status || "unapproved", // show green/red/yellow circles with box shadows and dropdown with unapproved etc
            });
          }
        }
      });
    }

    // set user authority
    if (owner?.id === user?.id) {
      setMembership({ status: "owner", statusText: "Owner" });
      setIsOwner(true);
    }
    if (coach?.id === user?.id) setIsCoach(true);
    if (leader?.id === user?.id) setIsLeader(true);
    const foundPlayer = players?.find(
      (x) => x?.user?.id === user?.id && x?.status !== "left"
    );
    if (foundPlayer) {
      if (
        ["unapproved", "active", "suspended"].includes(
          foundPlayer?.status.toLowerCase()
        )
      ) {
        setMembership({
          status: foundPlayer?.status,
          statusText: `${foundPlayer?.status}${
            _isOwner || _isLeader || _isCoach ? " as Player" : ""
          }`,
        });
      }
      setIsPlayer(true);
    }

    setMembers([...members]);
  }, [_team]);

  const addUserToTeamPlayers = () => {
    const toSet = [..._members];
    const foundMember = toSet?.find((x) => x?.id === user?.id);
    if (!foundMember) {
      toSet.push({
        id: user?.id || "Player-ID",
        name: user?.profile?.fullName || user?.id || "Player-ID",
        roles: ["Player"],
        image: user?.profile?.image || "/assets/person-placeholder.jpg",
        status: "unapproved", // show green/red/yellow circles with box shadows and dropdown with unapproved etc
      });
      setMembership({
        status: "unapproved",
        statusText: `Unapproved${
          _isOwner || _isLeader || _isCoach ? " as Player" : ""
        }`,
      });
    }
    if (
      foundMember &&
      !foundMember?.roles?.find((x) => x.toLowerCase() === "player")
    ) {
      foundMember?.roles?.push("player");
      setMembership({
        status: "unapproved",
        statusText: `Unapproved${
          _isOwner || _isLeader || _isCoach ? " as Player" : ""
        }`,
      });
    }
    setMembers([...toSet]);
    setIsPlayer(true);
  };

  const removeUserFromTeamPlayers = () => {
    let toSet = [..._members];
    const foundMember = toSet?.find((x) => x?.id === user?.id);
    if (foundMember) {
      foundMember.roles = foundMember?.roles?.filter(
        (x) => x?.toLowerCase() !== "player"
      );
      if (foundMember?.roles?.length == 0) {
        toSet = toSet?.filter((x) => x?.id !== user?.id);
      }
      setMembers([...toSet]);
      setMembership({
        status: _isOwner ? "owner" : null,
        statusText: _isOwner ? "Owner" : null,
      });
      setIsPlayer(false);
    }
  };

  return (
    <>
      <TeamHeader
        clubId={_team?.club?.id}
        clubCrest={_team?.club?.crest}
        clubName={_team?.club?.title}
        teamId={_team?.id}
        teamCrest={_team?.crest}
        teamTitle={_team?.title}
        showNotificationMsg={showNotificationMsg}
        joinButton={!_isPlayer}
        leaveButton={_isPlayer}
        isCoach={_isCoach}
        isLeader={_isLeader}
        isOwner={_isOwner}
        onMemberJoin={addUserToTeamPlayers}
        onMemberLeave={removeUserFromTeamPlayers}
      ></TeamHeader>
      <TeamMembers members={_members} membership={_membership}></TeamMembers>
      <TeamSubscriptionPlans
        teamId={_team?.id}
        plans={_team?.subscriptionPlans}
        showNotificationMsg={showNotificationMsg}
        isLeader={_isLeader}
        isOwner={_isOwner}
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
