import React from "react";
import ProfileSelf from "@page/profile";
import Seo from "@layout/seo";
import Layout from "@layout";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import Users from "@api/services/Users";
import Clubs from "@api/services/Clubs";

function ProfilePage({ user, clubs }) {
  return (
    <Layout>
      <Seo title="Edit Profile" desc="Edit Your Public Profile on Clubbie" />
      <ProfileSelf
        profileInfo={{
          profile: {
            ...user?.profile,
            id: user?.id,
            email: user?.local?.email,
          },
        }}
        clubs={clubs}
        editMode
      />
    </Layout>
  );
}

export default ProfilePage;

export const getServerSideProps = requiresPageAuth(async (ctx) => {
  const myProfile = await Users.GetMyProfile().catch(() => false);
  const user = myProfile?.data;

  const clubIds = user?.clubs?.map((c) => c?.club);
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
