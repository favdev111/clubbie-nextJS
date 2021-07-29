import React from "react";
import Join from "@page/teamhub/join";
import Layout from "@layout/";
import Seo from "@layout/seo";
import Clubs from "@api/services/Clubs";
import Users from "@api/services/Users";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";

function TeamhubRegisterTeamPage({ club, teamsJoined }) {
  return (
    <Layout>
      <Seo title="Register a team" desc="Lorem ipsum dolor sit amet" />
      <Join
        title="Register a Team"
        selectedClub={club}
        teams={club.teams}
        registerMode={true}
        teamsJoined={teamsJoined}
        hideList={true}
      />
    </Layout>
  );
}

export default TeamhubRegisterTeamPage;

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

  const clubId = ctx?.params?.clubId; // get club id from params
  const response = await Clubs.Get(clubId).catch(() => false);
  let club =
    response?.data && response?.data?.length > 0 ? response?.data[0] : null;

  // get user role for selected club
  const foundClubUserProfile = responsePublicUser?.data?.clubs?.find(
    (x) => x?.club?.id === club?.id
  );
  club = { ...club, joinRole: foundClubUserProfile?.role || null };

  const notFound = !club || !user || !userTeams;

  return {
    props: {
      club,
      teamsJoined: userTeams,
    },
    notFound: notFound,
  };
});
