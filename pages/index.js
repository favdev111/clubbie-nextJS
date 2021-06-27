import Layout from "@layout";
import Seo from "@layout/seo";
import React from "react";
import Home from "@page/home";
import HTTPClient from "@api/HTTPClient";
import Posts from "@api/services/Posts";
import { parseCookies } from "@utils/helpers/parseCookies";

const HomePage = ({ posts }) => {
  return (
    <Layout>
      <Seo
        title="Clubbie Login"
        desc="Clubbie Account Login - Raising The Bar For Amateur Sports"
      />
      <Home posts={posts.results} />
    </Layout>
  );
};
export default HomePage;

export const getServerSideProps = async (ctx) => {
  // TODO: get posts no auth
  const cookies = parseCookies(ctx.req);
  HTTPClient.setHeader("Authorization", `Bearer ${cookies.access_token}`);

  const response = await Posts.GetPost();
  const posts = response.data;

  return {
    props: {
      posts,
    },
  };
};
