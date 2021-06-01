import Layout from "@layout";
import Seo from "@layout/seo";
import React from "react";
import Home from "@page/home";

const HomePage = () => {
  return (
    <Layout>
      <Seo
        title="Clubbie Login"
        desc="Clubbie Account Login - Raising The Bar For Amateur Sports"
      />
      <Home />
    </Layout>
  );
};
export default HomePage;
