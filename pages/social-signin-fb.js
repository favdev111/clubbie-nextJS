import Layout from "@layout";
import Seo from "@layout/seo";
import React from "react";
import Wrap from "@layout/account-wrapper/";
import SocialSigninFB from "@page/social-signing-facebook";

const SocialSigninFBpage = () => {
  return (
    <Layout hideHeader>
      <Seo title="Sign with Facebook" desc="Lorem ipsum dolor sit amet" />
      <main className="main">
        <Wrap>
          <SocialSigninFB />
        </Wrap>
      </main>
    </Layout>
  );
};

export default SocialSigninFBpage;
