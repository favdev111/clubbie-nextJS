import React from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import Posts from "@api/services/Posts";
import Comments from "@api/services/Comments";
import Content from "@page/content";

function ContentEdit({ post }) {
  return (
    <Layout>
      <Seo title="Edit Content" desc="Lorem ipsum dolor sit amet" />
      <Content content={post} mode="edit" />
    </Layout>
  );
}

export default ContentEdit;

export const getServerSideProps = requiresPageAuth(async (ctx) => {
  const postId = ctx.params.postId;

  // get post
  const responsePost = await Posts.GetPostById(postId).catch(() => false);
  let post = responsePost?.data;

  // validate all data is found
  const notFound = !post;

  return {
    props: {
      post,
    },
    notFound: notFound,
  };
});
