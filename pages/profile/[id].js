import React from "react";
import ProfileSelf from "@page/profile-self/";
import Layout from "@layout";
import Seo from "@layout/seo";
import Users from "@api/services/Users";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";

function ProfilePagePublic({ profile, requiredCookiesToSet }) {
  // set cookies on client
  if (requiredCookiesToSet?.tokens) {
    cookie.set("access_token", requiredCookiesToSet.tokens.access.token, {
      expires: new Date(requiredCookiesToSet.tokens.access.expiry),
    });
    cookie.set("refresh_token", requiredCookiesToSet.tokens.refresh.token, {
      expires: new Date(requiredCookiesToSet.tokens.refresh.expiry),
    });
  }

  return (
    <Layout>
      <Seo title="User Profile" desc="Lorem ipsum dolor sit amet" />
      <ProfileSelf profile={profile} isPublic />
    </Layout>
  );
}

export default ProfilePagePublic;

export const getServerSideProps = requiresPageAuth(async (ctx) => {
  const userId = ctx.params.id;

  const requiredCookiesToSet = {
    tokens: ctx.setCookieForTokens || false,
  };
  const response = await Users.GetUserProfile(userId);
  const userProfile = response.data;

  return {
    props: {
      profile: userProfile,
    },
  };
});
