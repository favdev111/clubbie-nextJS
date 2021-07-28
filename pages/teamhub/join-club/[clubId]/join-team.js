import React from "react";
import Join from "@page/teamhub/join";
import Layout from "@layout/";
import Seo from "@layout/seo";
import Users from "@api/services/Users";
import Clubs from "@api/services/Clubs";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";

function TeamhubJoinTeamPage({ club, teamsJoined }) {
  return (
    <Layout>
      <Seo title="Join a team" desc="Lorem ipsum dolor sit amet" />
      <Join
        title="Join a Team"
        selectedClub={club}
        teams={club.teams}
        teamsJoined={teamsJoined}
      />
    </Layout>
  );
}

export default TeamhubJoinTeamPage;

export const getServerSideProps = requiresPageAuth(async (ctx) => {
  // get teams info of current user
  const responseUser = await Users.GetMyProfile().catch(() => null);
  const user = responseUser?.data;
  const responsePublicUser = await Users.GetUserProfile(user?.id).catch(
    () => null
  );
  const userTeams = responsePublicUser?.data?.teams?.map((x) => {
    return {
      id: x?.team?.id,
      role: x?.role,
    };
  });

  const clubId = ctx.params.clubId; // get club id from params
  const response = await Clubs.Get(clubId).catch(() => null);
  const club = response?.data[0];
  const notFound = !club || !user || !userTeams;

  return {
    props: {
      club,
      teamsJoined: userTeams,
    },
    notFound: notFound,
  };
});
