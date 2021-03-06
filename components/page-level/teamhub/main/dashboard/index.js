import React, { useState, useEffect } from "react";
import LastResult from "./lastresult";
import Teams from "@api/services/Teams";
import MyTeam from "./myteam";
import RecentVideos from "./recent";
import UpNext from "./upnext";
import LeagueTable from "./league-table";
import PaymentOverview from "./pay-overview";
import styles from "./index.module.css";

function Dashboard({ user, activeTeam, setTeam }) {
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [userTeams, setUserTeams] = useState([]);
  const [dashboardData, setDashData] = useState([]);

  useEffect(() => {
    const fetchUserTeams = async () => {
      /* queries */
      const arr = [];
      user.teams.map((i) => {
        arr.push(i.team);
      });
      const queries = arr.reduce((a, b) => {
        let sum = `${a}` + `&id=${b}`;
        return sum;
      });

      const response = await Teams.GetTeamsWithDetail(`id=${queries}`);
      const allUserTeams = response.data;
      setUserTeams(allUserTeams);
    };

    const fetchSelectedTeam = async () => {
      const dashboardResponse = await Teams.GetTeamDashboard(
        user?.teams[activeTeam]?.team
      ).catch(() => null);
      setSelectedTeam(dashboardResponse?.data?.team);
      setDashData(dashboardResponse?.data);
    };
    fetchUserTeams();
    fetchSelectedTeam();
  }, [activeTeam]);

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}> Dashboard</h1>
      {/* teamcard */}
      <MyTeam
        data={selectedTeam}
        user={user}
        userTeams={userTeams}
        setactive={setTeam}
        active={activeTeam}
      />
      {/* recent videos */}
      {dashboardData?.recentPosts?.length > 0 && (
        <RecentVideos data={dashboardData.recentPosts} />
      )}
      {/* up next */}
      {dashboardData?.nextMatch?.length > 0 && (
        <UpNext data={dashboardData.nextMatch} />
      )}
      {/* last result */}
      {dashboardData?.lastMatchResult && (
        <LastResult data={dashboardData.lastMatchResult} />
      )}
      {/* League table */}
      {dashboardData?.leagueTable && (
        <LeagueTable data={dashboardData.leagueTable} />
      )}
      No data yet
      {/* Payments overview */}
      {dashboardData?.payment && <PaymentOverview />}
    </div>
  );
}

export default Dashboard;
