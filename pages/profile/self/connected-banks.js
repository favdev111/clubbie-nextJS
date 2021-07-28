import React from "react";
import Seo from "@layout/seo";
import Layout from "@layout";
import ConnectedBanks from "@page/profile/connected-banks/";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import Users from "api/services/Users";

function ConnectedBanksPage({ user }) {
  return (
    <Layout>
      <Seo title="Connected Banks" desc="Lorem ipsum dolor sit amet" />
      <ConnectedBanks user={user} />
    </Layout>
  );
}

export default ConnectedBanksPage;

export const getServerSideProps = requiresPageAuth(async () => {
  const myProfile = await Users.GetMyProfile().catch(() => null);
  const user = myProfile?.data;

  const notFound = !user;

  return {
    props: {
      user,
    },
    notFound: notFound,
  };
});
