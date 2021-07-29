import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@sub/button";
import Table from "@sub/table";
import ChatSVG from "@svg/messages";
import styles from "./clubDetails.module.css";
import Team from "../../../../api/services/Teams"
import useNotification from "@sub/hook-notification";

function ClubDetails({ club }) {
  const [clubOfficialRows, setClubOfficialRows] = useState([]);
  const [clubTeamRows, setClubTeamRows] = useState([]);
  const [clubPlayerRows, setClubPlayerRows] = useState([]);
  const [teamJoined, setTeamJoined] = useState("")
  const { showNotificationMsg } = useNotification();
  useEffect(() => {
    if (club?.officials) {
      const rows = club?.officials?.map((x) => {
        return [
          () => (
            <div className={styles.clubMember}>
              <Link href={`/profile/${x?.user?.id}`}>
                <img
                  className={styles.clubMemberAvatar}
                  src={
                    x?.user?.profile?.image || "/assets/person-placeholder.jpg"
                  }
                />
              </Link>
              <Link href={`/profile/${x?.user?.id}`}>
                <a>
                  <span className={styles.clubMemberName}>
                    {x?.user?.profile?.fullName || "User Name" || x?.user?.id}
                  </span>
                </a>
              </Link>
            </div>
          ),
          () => <span className={styles.clubMemberRole}>{x?.role}</span>,
          () => (
            <div className={styles.clubMemberListAction}>
              <span>
                <Link
                  href={`/chats/${x?.user?.id}/start-new-chat-when-clicked`}
                >
                  <a>
                    <ChatSVG />
                  </a>
                </Link>
              </span>
            </div>
          ),
        ];
      });
      setClubOfficialRows(rows);
    }


    const teamInfo = async (teamId) => {
      try {
        const response = await Team.JoinTeam(teamId)
        const status = response.status
        if (status === 200) {
          const team = response.data.title
          showNotificationMsg(team + " Team Joined!", {
            variant: "success",
            displayIcon: true,
          });
        } else {
          showNotificationMsg("Error Joining Team", {
            variant: "error",
            displayIcon: true,
          });
        }
      } catch (e) {
        showNotificationMsg(e, {
          variant: "error",
          displayIcon: true,
        });
      }
    }

    if (club?.teams) {
      const rows = club?.teams?.map((x) => {
        return [
          () => (
            <div className={styles.clubMember}>
              <Link href={`/clubs/${club?.id}/teams/${x?.id}`}>
                <img
                  className={styles.clubMemberAvatar}
                  src={x?.crest || "/assets/person-placeholder.jpg"}
                />
              </Link>
              <Link href={`/clubs/${club?.id}/teams/${x?.id}`}>
                <a>
                  <span className={styles.clubMemberName}>
                    {x?.title || "Team Name" || x?.id}
                  </span>
                </a>
              </Link>
            </div>
          ),
          () => (
            <div className={styles.clubMemberListAction}>
              <span>
                <a>
                  <Button size="x-small" onClick={teamInfo.bind(this, x?.id)}>Join</Button>
                </a>
              </span>
            </div>
          ),
        ];
      });
      setClubTeamRows(rows);
    }
    if (club?.players) {
      const rows = club?.players?.map((x) => {
        return [
          () => (
            <div className={styles.clubMember}>
              <Link href={`/profile/${x?.id}`}>
                <img
                  className={styles.clubMemberAvatar}
                  src={x?.profile?.image || "/assets/person-placeholder.jpg"}
                />
              </Link>
              <Link href={`/profile/${x?.id}`}>
                <a>
                  <span className={styles.clubMemberName}>
                    {x?.profile?.fullName || "User Name" || x?.id}
                  </span>
                </a>
              </Link>
            </div>
          ),
          () => (
            <span className={styles.clubMemberRole}>
              {x?.profile?.playerTitle || "No Title"}
            </span>
          ),
          () => (
            <div className={styles.clubMemberListAction}>
              <span>
                <Link href={`/chats/${x?.id}/start-new-chat-when-clicked`}>
                  <a>
                    <ChatSVG />
                  </a>
                </Link>
              </span>
            </div>
          ),
        ];
      });
      setClubPlayerRows(rows);
    }
  }, [club]);

  return (
    <>
      <div>
        <div className={styles.clubHeaderWrapper}>
          <img
            className={styles.clubCrest}
            src={club?.crest || "/assets/club-badge-placeholder.png"}
          />
          <h1>{club?.title}</h1>
          <div className={styles.clubActionButtons}>
            <Button variant="success">Join</Button>
            <Button variant="danger">Leave</Button>
            <Button>Manage</Button>
            <Button variant="cancel">Edit</Button>
            <Button>Add Team</Button>
          </div>
        </div>

        <div className={styles.clubBodyWrapper}>
          <div>
            <h3>Description</h3>
            <p className={styles.clubDescription}>
              {"A  group of people who meet to participate in an activity (such as a sport or hobby) : the place where the members of a club meet. : a sports team or organization." ||
                club?.description ||
                "Add Club Description..."}
            </p>
          </div>
          <h3 className={styles.tblHeading}>Officials</h3>
          <div className={styles.clubOfficials}>
            <Table
              className={styles.clubTable}
              header={["Name", "Role", "Action"]}
              rows={clubOfficialRows}
            ></Table>
          </div>
          <div className={styles.clubsTeamsAndPlayers}>
            <div className={styles.teamContent}>
              <h3 className={styles.tblHeading}>Teams</h3>
              <div className={styles.clubTeams}>
                <Table
                  className={styles.clubTable}
                  header={["Name", "Action"]}
                  rows={clubTeamRows}
                ></Table>
              </div>
            </div>
            <div className={styles.playerContent}>
              <h3 className={styles.tblHeading}>Players</h3>
              <div className={styles.clubPlayers}>
                <Table
                  className={styles.clubTable}
                  header={["Name", "Role", "Action"]}
                  rows={clubPlayerRows}
                ></Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClubDetails;
