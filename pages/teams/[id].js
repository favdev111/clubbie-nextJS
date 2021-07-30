import React from "react";
import TeamPage from "@page/team";
import Layout from "@layout";
import Seo from "@layout/seo";
import Teams from "@api/services/Teams";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";

function Team({ team }) {
  return (
    <Layout>
      <Seo title="Team" desc="Lorem ipsum dolor sit amet" />
      <TeamPage team={team} />
    </Layout>
  );
}

export default Team;

export const getServerSideProps = requiresPageAuth(async (ctx) => {
  const teamId = ctx.params.id;

  let team = null;

  // get the team
  const response = await Teams.Get(teamId).catch(() => null);
  if (response)
    team =
      response?.data && response?.data?.length > 0 ? response?.data[0] : null;
  const notFound = !team;

  return {
    props: {
      team: team,
    },
    notFound: notFound,
  };
});
