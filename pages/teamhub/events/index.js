import React, { useEffect } from "react";
import router from "next/router";
import Layout from "@layout";
import Seo from "@layout/seo";
import DashboardContent from "@page/teamhub/main";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import Users from "@api/services/Users";

function TeamhubEvent({ user }) {
  useEffect(() => {
    if (user?.clubs.length === 0) {
      router.push("./teamhub/initial");
    }
  }, [user]);

  return (
    <Layout>
      <Seo title="Events" desc="Lorem ipsum dolor sit amet" />
      <DashboardContent user={user} />
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
