import Layout from "@layout";
import Seo from "@layout/seo";
import React from "react";
import Home from "@page/content/feed";
import Posts from "@api/services/Posts";
import HTTPClient from "@api/HTTPClient";
import authUser from "@utils/helpers/auth";
import { parseCookies } from "@utils/helpers/parseCookies";

const HomePage = ({ posts }) => {
  const user = authUser.getUser();

  return (
    <Layout>
      <Seo
        title="Clubbie"
        desc="Clubbie - Raising The Bar For Amateur Sports"
      />
      <Home posts={posts} user={user} />
    </Layout>
  );
};

export default HomePage;

export const getServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx.req);
  const accessToken = cookies.access_token;
  HTTPClient.setHeader("Authorization", `Bearer ${accessToken}`);

  const response = await Posts.GetPosts({
    limit: 10,
    page: 1,
    sortBy: "createdAt:desc",
  }).catch(() => undefined);
  const posts = response?.data;

  return {
    props: {
      posts,
    },
  };
};
