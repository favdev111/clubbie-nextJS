import React from "react";
import Layout from "@layout/index";
import Seo from "@layout/seo";
import AddEvent from "@page/teamhub/main/events/add";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import Users from "@api/services/Users";
import Teams from "@api/services/Teams";

function AddNewEvent({ user, teams }) {
  return (
    <Layout>
      <Seo title="Add Event" desc="Lorem ipsum dolor sit amet" />
      <AddEvent user={user} teams={teams} />
    </Layout>
  );
}

export default AddNewEvent;

export const getServerSideProps = requiresPageAuth(async () => {
  const responseProfile = await Users.GetMyProfile().catch(() => false);
  const _user = responseProfile?.data;

  const teamIds = _user?.teams?.map((x) => x.team);
  const responseTeams = await Teams.GetTeamsWithDetails(teamIds).catch(
    () => false
  );
  const teams = responseTeams?.data;

  return {
    props: {
      user: _user,
      teams: teams,
    },
  };
});
