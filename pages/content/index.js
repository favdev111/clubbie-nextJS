import React from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import Teams from "@api/services/Teams";
import Content from "@page/content";

function ContentAdd({ user, team }) {
  return (
    <Layout>
      <Seo title="Add Content" desc="Lorem ipsum dolor sit amet" />
      <Content mode="add" user={user} team={team} />
    </Layout>
  );
}

export default ContentAdd;

export const getServerSideProps = requiresPageAuth(async (ctx) => {
  const user = ctx.user;

  let team = null;
  let notFound = false;
  const teamId = ctx?.query?.teamId;

  // validate team if any in query param
  if (teamId) {
    const response = await Teams.Get(teamId).catch(() => null);
    team = response?.data[0];
    const ownerId = team?.owner?.id;
    const leaderId = team?.leader?.id;
    if (!team || (!ownerId && !leaderId)) notFound = true;
    if (user?.id !== leaderId || user?.id !== ownerId) notFound = true;
  }

  return { props: { team: team }, notFound: notFound };
});
