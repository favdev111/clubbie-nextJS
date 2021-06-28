import React, { useState } from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import auth from "@utils/helpers/auth";
import DashboardContent from "@page/teamhub-dashboard";

function EventDetailPage({ user, requiredCookiesToSet, posts }) {
  const [activeTeam, setTeam] = useState(0);

  const token = auth.getAccessToken();

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
      <Seo title="User Profile" desc="Lorem ipsum dolor sit amet" />
      <DashboardContent
        activeTeam={activeTeam}
        setTeam={setTeam}
        token={token}
        user={user}
      ></DashboardContent>
    </Layout>
  );
}

export default EventDetailPage;

export const getServerSideProps = requiresPageAuth(async (ctx) => {
  const id = ctx.params.id;
  console.log(ctx.params);

  const requiredCookiesToSet = {
    tokens: ctx.setCookieForTokens || false,
  };
  /*   const response = await Users.GetUserProfile(userId);
  const userProfile = response.data;

  const resUploadedPosts = await Users.GetUsersPosts(userId);
  const userUploadedPosts = resUploadedPosts.data;
  const resLikedPosts = await Users.GetLikedPosts(userId);
  const userLikedPosts = resLikedPosts.data;
  const resRepostedPosts = await Users.GetRepostedPosts(userId);
  const userRepostedPosts = resRepostedPosts.data;
  const posts = {
    uploaded: userUploadedPosts,
    liked: userLikedPosts,
    reposted: userRepostedPosts,
  };
 */

  return {
    props: {
      requiredCookiesToSet,
    },
  };
});
