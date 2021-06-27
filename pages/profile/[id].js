import React from "react";
import ProfileSelf from "@page/profile";
import Layout from "@layout";
import Seo from "@layout/seo";
import Users from "@api/services/Users";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import auth from "@utils/helpers/auth";

function ProfilePagePublic({ profile, requiredCookiesToSet, posts }) {
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
      <ProfileSelf profile={profile} posts={posts} isPublic />
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

  console.log(posts);

  return {
    props: {
      requiredCookiesToSet,
      profile: userProfile,
      posts,
    },
  };
});
