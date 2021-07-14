import React from "react";
import Profile from "@page/profile";
import Layout from "@layout";
import Seo from "@layout/seo";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import Users from "@api/services/Users";
import Clubs from "@api/services/Clubs";

function ProfilePage({ user, posts, clubs }) {
  return (
    <Layout>
      <Seo title="My Profile" desc="Lorem ipsum dolor sit amet" />
      <Profile
        profileInfo={{ ...user, id: user?.id }}
        posts={posts}
        clubs={clubs}
      />
    </Layout>
  );
}

export default ProfilePage;

export const getServerSideProps = requiresPageAuth(async (ctx) => {
  const user = ctx.user;

  const postsFilter = {
    limit: 10,
    page: 1,
    sortBy: "createdAt:desc",
  };

  const resUploadedPosts = await Users.GetUploadedPosts(
    user.id,
    postsFilter
  ).catch(() => false); // avoid page error for now
  const userUploadedPosts = resUploadedPosts?.data;
  const resLikedPosts = await Users.GetLikedPosts(user.id, postsFilter).catch(
    () => false
  ); // avoid page error for now
  const userLikedPosts = resLikedPosts?.data;
  const resRepostedPosts = await Users.GetRepostedPosts(user.id).catch(
    () => false,
    postsFilter
  ); // avoid page error for now
  const userRepostedPosts = resRepostedPosts?.data;
  const posts = {
    uploaded: userUploadedPosts || [],
    liked: userLikedPosts || [],
    reposted: userRepostedPosts || [],
  };

  const clubIds = user.clubs.map((c) => c.club);
  const userClubs = await Clubs.GetClubsWithDetails(clubIds).catch(() => false);
  const clubs = userClubs?.data || [];

  const notFound = !user;

  return {
    props: {
      user,
      posts,
      clubs,
    },
    notFound: notFound,
  };
});
