import React from "react";
import TeamCard from "./card";
import styles from "./index.module.css";

function MyTeam({ active, setactive, userTeams, user }) {
  const userTeamRoles = [];
  user?.teams.map((i) => {
    userTeamRoles.push(i.role);
  });
  return (
    <>
      <div className={styles.myTeam}>
        <h3> My team</h3>
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
