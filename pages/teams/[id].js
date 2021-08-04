import React from "react";
import TeamPage from "@page/team";
import Layout from "@layout";
import Seo from "@layout/seo";
import Teams from "@api/services/Teams";
import Posts from "@api/services/Posts";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";

function Team({ team, posts, user }) {
  return (
    <Layout>
      <Seo title="Team" desc="Lorem ipsum dolor sit amet" />
      <TeamPage team={team} posts={posts} user={user} postFeed={true} />
    </Layout>
  );
}

export default Team;

export const getServerSideProps = requiresPageAuth(async (ctx) => {
  const teamId = ctx.params.id;

  let team = null;

  // get the team
  const responseTeam = await Teams.Get(teamId).catch(() => null);
  if (responseTeam)
    team =
      responseTeam?.data && responseTeam?.data?.length > 0
        ? responseTeam?.data[0]
        : null;

  // get team posts
  const query = { limit: 10, page: 1, sortBy: "createdAt:desc" };
  const responsePost = await Posts.GetTeamPosts(teamId, query).catch(
    () => null
  );
  const posts = responsePost?.data;

  const notFound = !team || !posts;

  return {
    props: {
      team: team,
      posts: posts,
    },
    notFound: notFound,
  };
});
