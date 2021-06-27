import React from "react";
import Join from "@page/teamhub/join/";
import Seo from "@layout/seo";
import Layout from "@layout";
import Clubs from "@api/services/Clubs";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";

function TeamhubRegisterClubPage({ clubs }) {
  return (
    <Layout>
      <Seo title="Register a Club" desc="Lorem ipsum dolor sit amet" />
      <Join title="Register a Club" clubs={clubs} register />
    </Layout>
  );
}
export default TeamhubRegisterClubPage;

export const getServerSideProps = requiresPageAuth(async (ctx) => {
  const requiredCookiesToSet = {
    tokens: ctx.setCookieForTokens || false,
  };

  const response = await Clubs.Fetch().catch(() => false);
  const clubs = response?.data;
  const notFound = !clubs;

  return {
    props: {
      requiredCookiesToSet,
      clubs: clubs?.results,
    },
    notFound: notFound,
  };
});
