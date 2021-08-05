import React from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import Posts from "@api/services/Posts";
import Teams from "@api/services/Teams";
import Comments from "@api/services/Comments";
import Content from "@page/content";
import HTTPClient from "@api/HTTPClient";
import authUser from "@utils/helpers/auth";
import { parseCookies } from "@utils/helpers/parseCookies";

function ContentDetails({ post, team }) {
  const user = authUser.getUser();

  return (
    <Layout>
      <Seo title="Content Details" desc="Lorem ipsum dolor sit amet" />
      <Content content={post} user={user} team={team} />
    </Layout>
  );
}

export default ContentDetails;

export const getServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx.req);
  const accessToken = cookies.access_token;
  HTTPClient.setHeader("Authorization", `Bearer ${accessToken}`);

  const user = ctx.user;
  const postId = ctx.params.postId;
  const teamId = ctx?.query?.teamId;

  // get posts
  const responsePost = await Posts.GetPostById(postId).catch(() => false);
  let post = responsePost?.data;

  // get comments
  const responsePostComments = await Comments.GetComments(postId, {
    limit: 10,
    page: 1,
    sortBy: "dateTime:desc",
    repliesLimit: 3,
  }).catch(() => false);
  const comments = responsePostComments?.data;

  // get team if teamId
  const responseTeam = await Teams.Get(teamId).catch(() => null);
  const team =
    responseTeam?.data && responseTeam?.data?.length > 0
      ? responseTeam?.data[0]
      : null;

  // validate all data found
  const notFound = !post || !comments || (teamId && !team);

  if (!notFound) post.comments = comments;

  return {
    props: {
      post,
      team,
    },
    notFound: notFound,
  };
};
