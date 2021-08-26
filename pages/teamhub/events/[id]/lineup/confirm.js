import React from "react";
import Layout from "@layout/index";
import Seo from "@layout/seo";
import PitchBlock from "@page/teamhub/main/events/pitch/PitchBlock";
import Users from "@api/services/Users";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import auth from "@utils/helpers/auth";

function PitchPage() {
  const authUser = auth.getUser();
  return (
    <Layout>
      <Seo title="Dashboard" desc="Lorem ipsum dolor sit amet" />
      <main>
        <PitchBlock />
      </main>
    </Layout>
  );
}

export default PitchPage;

export const getServerSideProps = requiresPageAuth(async () => {
  const responseProfile = await Users.GetMyProfile().catch(() => false);
  const _user = responseProfile?.data;

  return {
    props: {
      user: _user,
    },
  };
});
