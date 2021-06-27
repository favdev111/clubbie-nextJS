import React from "react";
import ProfileSelf from "@page/profile";
import Seo from "@layout/seo";
import Layout from "@layout";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import { parseCookies } from "@utils/helpers/parseCookies";
import Clubs from "@api/services/Clubs";
import HTTPClient from "@api/HTTPClient";

function ProfilePage({ user, clubs }) {
  return (
    <Layout>
      <Seo title="Edit Profile" desc="Edit Your Public Profile on Clubbie" />
      <ProfileSelf
        profile={{ ...user?.profile, id: user?.id }}
        clubs={clubs}
        editMode
      />
    </Layout>
  );
}

export default ProfilePage;

export const getServerSideProps = requiresPageAuth(async (ctx) => {
  const cookies = parseCookies(ctx.req);
  HTTPClient.setHeader("Authorization", `Bearer ${cookies.access_token}`);
  const user = (() => {
    return typeof cookies.user === "string"
      ? JSON.parse(cookies.user)
      : cookies.user;
  })();

  const clubIds = user.clubs.map((c) => c.club);
  const userClubs = await Clubs.GetClubsWithDetails(clubIds).catch(() => false);
  const clubs = userClubs?.data || [];

  const notFound = !user;

  return {
    props: {
      user,
      clubs,
    },
    notFound: notFound,
  };
});
