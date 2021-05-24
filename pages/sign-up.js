import Layout from "@layout";
import Seo from "@layout/seo";
import React from "react";
import Wrap from "@layout/account-wrapper/";
import SignUp from "@page/sign-up";

const SignUpPage = () => {
  return (
    <Layout hideHeader>
      <Seo title="Profile Self" desc="Lorem ipsum dolor sit amet" />
      <main className="main">
        <Wrap>
          <SignUp />
        </Wrap>
      </main>
    </Layout>
  );
};
export default SignUpPage;
