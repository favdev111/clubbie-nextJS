import React from "react";
import Link from "next/link";
import TeamCard from "./card";
import PlusTurkSVG from "@svg/plus-turk";
import styles from "./index.module.css";

function MyTeam({ active, setactive, userTeams, user }) {
  const userTeamRoles = [];
  user?.teams?.map((i) => {
    userTeamRoles.push(i.role);
  });
  return (
    <>
      <div className={styles.myTeam}>
        <div className={styles.myTeamFlex}>
          <h3>My team</h3>
          <Link href="/teamhub/initial">
            <a>
              <span className={styles.teamhubInitial}>
                <PlusTurkSVG></PlusTurkSVG>
              </span>
            </a>
          </Link>
        </div>
        <div className={styles.myTeamFlex}>
          {userTeams.map((team, index) => (
            <TeamCard
              key={team + index}
              active={active}
              index={index}
              data={team}
              teamRoles={userTeamRoles}
              setactive={setactive}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default MyTeam;
