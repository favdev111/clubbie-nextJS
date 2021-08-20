import React from "react";
import Layout from "@layout/index";
import Seo from "@layout/seo";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import auth from "@utils/helpers/auth";
import EditEvent from "@page/teamhub/main/events/edit";
import Users from "@api/services/Users";

function EditEventPage({ activeTeam }) {
  const authUser = auth.getUser();
  const teamId = authUser?.teams[activeTeam].team;

  return (
    <Layout>
      <Seo title="Dashboard" desc="Lorem ipsum dolor sit amet" />
      <EditEvent activeTeam={teamId} user={authUser} />
    </Layout>
  );
}

export default EditEventPage;

export const getServerSideProps = requiresPageAuth(async () => {
  const responseProfile = await Users.GetMyProfile().catch(() => false);
  const _user = responseProfile?.data;

  return {
    props: {
      user: _user,
    },
  };
});
