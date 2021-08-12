import React, { useState, useEffect } from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import DashboardContent from "@page/teamhub/dashboard";
import Router from "next/router";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import Users from "@api/services/Users";

function TeamhubEvent({ user, activeTeam, setTeam }) {
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

export default TeamhubEvent;

export const getServerSideProps = requiresPageAuth(async () => {
  const responseProfile = await Users.GetMyProfile().catch(() => false);
  const _user = responseProfile?.data;

  return {
    props: {
      user: _user,
    },
  };
});
