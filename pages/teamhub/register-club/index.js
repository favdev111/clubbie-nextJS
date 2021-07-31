import React from "react";
import Join from "@page/teamhub/join/";
import Seo from "@layout/seo";
import Layout from "@layout";
import Clubs from "@api/services/Clubs";
import Users from "@api/services/Users";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";

function TeamhubRegisterClubPage({ clubs, clubsJoined }) {
  return (
    <Layout>
      <Seo title="Register a Club" desc="Lorem ipsum dolor sit amet" />
      <Join
        title="Register a Club"
        clubs={clubs}
        registerMode={true}
        clubsJoined={clubsJoined}
        hideList={true}
      />
    </Layout>
  );
}
export default TeamhubRegisterClubPage;

export const getServerSideProps = requiresPageAuth(async (ctx) => {
  // get clubs info of current user
  const responseUser = await Users.GetMyProfile().catch(() => null);
  const user = responseUser?.data;
  const responsePublicUser = await Users.GetUserProfile(user?.id).catch(
    () => null
  );
  const userClubs = responsePublicUser?.data?.clubs?.map((x) => {
    return {
      id: x?.club?.id,
      role: x?.role,
    };
  });

  const response = await Clubs.Fetch().catch(() => false);
  const clubs = response?.data;
  const notFound = !clubs || !user || !userClubs;

  return {
    props: {
      clubs: clubs?.results,
      clubsJoined: userClubs,
    },
    notFound: notFound,
  };
});
