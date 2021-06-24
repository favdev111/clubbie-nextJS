import React from "react";
import cookie from "js-cookie";
import Join from "@page/teamhub/join/";
import Seo from "@layout/seo";
import Layout from "@layout";
import Clubs from "@api/services/Clubs";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";

function TeamhubRegisterClubPage({ clubs, requiredCookiesToSet }) {
  // set cookies on client
  if (requiredCookiesToSet?.tokens) {
    cookie.set("access_token", requiredCookiesToSet.tokens.access.token);
    cookie.set("refresh_token", requiredCookiesToSet.tokens.refresh.token, {
      expires: new Date(requiredCookiesToSet.tokens.refresh.expiry),
    });
  }

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

  const response = await Clubs.Fetch();
  const clubs = response.data;

  return {
    props: {
      requiredCookiesToSet,
      clubs: clubs.results,
    },
  };
});
