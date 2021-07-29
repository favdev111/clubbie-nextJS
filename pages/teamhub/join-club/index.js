import React from "react";
import Join from "@page/teamhub/join/";
import Seo from "@layout/seo";
import Layout from "@layout";
import Clubs from "@api/services/Clubs";
import Users from "@api/services/Users";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";

function TeamhubJoinClubPage({ clubs, clubsJoined }) {
  return (
    <Layout>
      <Seo title="Join a Club" desc="Lorem ipsum dolor sit amet" />
      <Join title="Join a Club" clubs={clubs} clubsJoined={clubsJoined} />
    </Layout>
  );
}
export default TeamhubJoinClubPage;

export const getServerSideProps = requiresPageAuth(async () => {
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

  const responseClubs = await Clubs.Fetch().catch(() => false);
  const clubs = responseClubs?.data;
  const notFound = !clubs || !user || !userClubs;

  return {
    props: {
      clubs: clubs.results,
      clubsJoined: userClubs,
    },
    notFound: notFound,
  };
});
