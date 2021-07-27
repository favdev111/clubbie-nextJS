import React from "react";
import Profile from "@page/profile";
import Layout from "@layout";
import Seo from "@layout/seo";
import Users from "@api/services/Users";
import Clubs from "@api/services/Clubs";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";

function ProfilePagePublic({ profileInfo, posts, clubs }) {
  return (
    <Layout>
      <Seo title="User Profile" desc="Lorem ipsum dolor sit amet" />
      <Profile profileInfo={profileInfo} posts={posts} clubs={clubs} isPublic />
    </Layout>
  );
}

export default ProfilePagePublic;

export const getServerSideProps = requiresPageAuth(async (ctx) => {
  const userId = ctx.params.id;

  const response = await Users.GetUserProfile(userId).catch(() => false);
  const userProfile = response?.data;

  const postsFilter = {
    limit: 10,
    page: 1,
    sortBy: "createdAt:desc",
  };

  const resUploadedPosts = await Users.GetUploadedPosts(
    userId,
    postsFilter
  ).catch(() => false); // avoid page error for now
  const userUploadedPosts = resUploadedPosts?.data;
  const resLikedPosts = await Users.GetLikedPosts(userId, postsFilter).catch(
    () => false
  ); // avoid page error for now
  const userLikedPosts = resLikedPosts?.data;
  const resRepostedPosts = await Users.GetRepostedPosts(userId).catch(
    () => false,
    postsFilter
  ); // avoid page error for now
  const userRepostedPosts = resRepostedPosts?.data;
  const posts = {
    uploaded: userUploadedPosts || [],
    liked: userLikedPosts || [],
    reposted: userRepostedPosts || [],
  };

  const clubIds = userProfile.clubs.map((c) => c?.club?.id);
  const userClubs = await Clubs.GetClubsWithDetails(clubIds).catch(() => false);
  const clubs = userClubs?.data || [];

  const notFound = !userProfile;

  return {
    props: {
      profileInfo: { ...userProfile, id: userId },
      posts,
      clubs,
    },
    notFound: notFound,
  };
});
