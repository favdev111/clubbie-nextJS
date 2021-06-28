import React, { useState, useEffect } from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import DashboardContent from "@page/teamhub-dashboard";
import Router from "next/router";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import auth from "@utils/helpers/auth";

function TeamhubDashboard({ user, activeTeam, setTeam }) {
  useEffect(() => {
    if (user?.clubs.length === 0) {
      Router.push("./teamhub/initial");
    }
  }, [user]);

  return (
    <Layout>
      <Seo title="Dashboard" desc="Lorem ipsum dolor sit amet" />
      <DashboardContent
        activeTeam={activeTeam}
        setTeam={setTeam}
        user={user}
      ></DashboardContent>
    </Layout>
  );
}

export default TeamhubDashboard;

export const getServerSideProps = requiresPageAuth();
