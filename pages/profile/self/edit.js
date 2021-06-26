import React from "react";
import ProfileSelf from "@page/profile";
import Seo from "@layout/seo";
import Layout from "@layout";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import auth from "@utils/helpers/auth";
import { parseCookies } from "@utils/helpers/parseCookies";
import Clubs from "@api/services/Clubs";
import HTTPClient from "@api/HTTPClient";

function ProfilePage({ requiredCookiesToSet, user, clubs }) {
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
      <Seo title="Edit Profile" desc="Edit Your Public Profile on Clubbie" />
      <ProfileSelf profile={user?.profile} clubs={clubs} editMode />
    </Layout>
  );
}

export default ProfilePage;

export const getServerSideProps = requiresPageAuth(async (ctx) => {
  const requiredCookiesToSet = {
    tokens: ctx.setCookieForTokens || false,
  };

  const cookies = parseCookies(ctx.req);
  HTTPClient.setHeader("Authorization", `Bearer ${cookies.access_token}`);
  const user = (() => {
    return typeof cookies.user === "string"
      ? JSON.parse(cookies.user)
      : cookies.user;
  })();

  const clubIds = user.clubs.map((c) => c.club);
  const userClubs = await Clubs.GetClubsWithDetails(clubIds);
  const clubs = userClubs.data;

  return {
    props: {
      requiredCookiesToSet,
      user,
      clubs,
    },
  };
});
