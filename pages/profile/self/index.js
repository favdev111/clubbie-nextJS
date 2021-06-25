import React from "react";
import ProfileSelf from "@page/profile";
import Layout from "@layout";
import Seo from "@layout/seo";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import auth from "@utils/helpers/auth";
import { parseCookies } from "@utils/helpers/parseCookies";
import Users from "@api/services/Users";
import Clubs from "@api/services/Clubs";
import HTTPClient from "@api/HTTPClient";

function ProfilePage({ requiredCookiesToSet, user, posts, clubs }) {
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
      <Seo title="My Profile" desc="Lorem ipsum dolor sit amet" />
      <ProfileSelf profile={user?.profile} posts={posts} clubs={clubs} />
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

  const resUploadedPosts = await Users.GetUsersPosts(user.id);
  const userUploadedPosts = resUploadedPosts.data;
  const resLikedPosts = await Users.GetLikedPosts(user.id);
  const userLikedPosts = resLikedPosts.data;
  const resRepostedPosts = await Users.GetRepostedPosts(user.id);
  const userRepostedPosts = resRepostedPosts.data;
  const posts = {
    uploaded: userUploadedPosts,
    liked: userLikedPosts,
    reposted: userRepostedPosts,
  };

  const clubIds = user.clubs.map((c) => c.club);
  const userClubs = await Clubs.GetClubsWithDetails(clubIds);
  const clubs = userClubs.data;

  return {
    props: {
      requiredCookiesToSet,
      user,
      posts,
      clubs,
    },
  };
});
