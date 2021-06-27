import React from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import Posts from "@api/services/Posts";
import Comments from "@api/services/Comments";
import Content from "@page/content";

function ContentDetails({ post }) {
  return (
    <Layout>
      <Seo title="Content Details" desc="Lorem ipsum dolor sit amet" />
      <Content content={post} />
    </Layout>
  );
}

export default ContentDetails;

export const getServerSideProps = requiresPageAuth(async (ctx) => {
  const postId = ctx.params.postId;

  // get posts
  const responsePost = await Posts.GetPostById(postId).catch(() => false);
  let post = responsePost?.data;

  // get comments
  const responsePostComments = await Comments.GetComments(postId).catch(
    () => false
  );
  const comments = responsePostComments?.data;

  // validate both are found
  const notFound = !post || !comments;

  if (!notFound) post.comments = comments;

  return {
    props: {
      post,
    },
    notFound: notFound,
  };
});
