import React from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import auth from "@utils/helpers/auth";
import { parseCookies } from "@utils/helpers/parseCookies";
import HTTPClient from "@api/HTTPClient";
import Posts from "@api/services/Posts";
import Comments from "@api/services/Comments";
import Content from "@page/content";

function ContentDetails({ requiredCookiesToSet, post }) {
  // set cookies on client
  if (requiredCookiesToSet?.tokens) {
    auth.setAccessToken(requiredCookiesToSet.tokens.access.token, {
      expires: new Date(requiredCookiesToSet.tokens.access.expiry),
    });
    auth.setRefreshToken(requiredCookiesToSet.tokens.refresh.token, {
      expires: new Date(requiredCookiesToSet.tokens.refresh.expiry),
    });
  }

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

  const requiredCookiesToSet = {
    tokens: ctx.setCookieForTokens || false,
  };

  const cookies = parseCookies(ctx.req);
  HTTPClient.setHeader("Authorization", `Bearer ${cookies.access_token}`);

  // get posts
  const responsePost = await Posts.GetPostById(postId);
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
      requiredCookiesToSet,
      post,
    },
    notFound: notFound,
  };
});
