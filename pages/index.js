import Layout from "@layout";
import Seo from "@layout/seo";
import React from "react";
import Home from "@page/home";

const HomePage = ({ videos }) => {
  return (
    <Layout>
      <Seo
        title="Clubbie Login"
        desc="Clubbie Account Login - Raising The Bar For Amateur Sports"
      />
      <Home videos={videos} />
    </Layout>
  );
};
export default HomePage;

export const getStaticProps = async () => {
  const videos = [
    {
      team: "Herne Bay FC",
      desc:
        "Lorem ipsum dolor sit amet lorem ipsum homa ferestes kasa de ver hele amın oglu",
      date: "4 weeks ago",
      viewCount: 255,
      likeCount: 15,
      commentCount: 5,
      url: "/asset",
    },
    {
      team: "Herne Bay FC",
      desc:
        "Lorem ipsum dolor sit amet lorem ipsum homa ferestes kasa de ver hele amın oglu",
      date: "4 weeks ago",
      viewCount: 255,
      likeCount: 15,
      commentCount: 5,
      url: "/asset",
    },
  ];
  return {
    props: {
      videos,
    },
  };
};
