import Layout from "@layout";
import Seo from "@layout/seo";
import React from "react";
import Wrap from "@layout/account-wrapper/";
import SocialSigninG from "@page/social-signing-google/";

const SocialSigninGpage = () => {
  return (
    <Layout hideHeader>
      <Seo title="Sign with Google" desc="Lorem ipsum dolor sit amet" />
      <main className="main">
        <Wrap>
          <SocialSigninG />
        </Wrap>
      </main>
    </Layout>
  );
};

export default SocialSigninGpage;
