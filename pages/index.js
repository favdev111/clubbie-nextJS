import Layout from "@layout";
import Seo from "@layout/seo";
import React from "react";
import Home from "@page/home";
import Posts from "@api/services/Posts";

const HomePage = ({ posts }) => {
  return (
    <Layout>
      <Seo
        title="Clubbie"
        desc="Clubbie - Raising The Bar For Amateur Sports"
      />
      <Home posts={posts} />
    </Layout>
  );
};
export default HomePage;

export const getServerSideProps = async (ctx) => {
  // TODO: pagination
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
