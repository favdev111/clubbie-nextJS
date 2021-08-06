import React from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import Posts from "@api/services/Posts";
import Teams from "@api/services/Teams";
import Content from "@page/content";

function ContentEdit({ post, team }) {
  return (
    <Layout>
      <Seo title="Edit Content" desc="Lorem ipsum dolor sit amet" />
      <Content content={post} team={team} mode="edit" />
    </Layout>
  );
}

export default ContentEdit;

export const getServerSideProps = requiresPageAuth(async (ctx) => {
  const postId = ctx.params.postId;
  const teamId = ctx?.query?.teamId;

  // get post
  const responsePost = await Posts.GetPostById(postId).catch(() => false);
  let post = responsePost?.data;

  // get team if teamId
  const responseTeam = await Teams.Get(teamId).catch(() => null);
  const team =
    responseTeam?.data && responseTeam?.data?.length > 0
      ? responseTeam?.data[0]
      : null;

  // validate all data is found
  const notFound = !post || (teamId && !team);

  return {
    props: {
      post,
      team,
    },
    notFound: notFound,
  };
});
