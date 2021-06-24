import React from "react";
import Join from "@page/teamhub/join/";
import Seo from "@layout/seo";
import Layout from "@layout";
import Clubs from "@api/services/Clubs";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import auth from "@utils/helpers/auth";

function TeamhubRegisterClubPage({ clubs, requiredCookiesToSet }) {
  // set cookies on client
  if (requiredCookiesToSet?.tokens) {
    auth.setAccessToken(requiredCookiesToSet.tokens.access.token, {
      expires: new Date(requiredCookiesToSet.tokens.access.expiry),
    });
    auth.setRefreshToken(requiredCookiesToSet.tokens.refresh.token, {
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
