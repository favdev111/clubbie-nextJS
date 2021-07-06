import React from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import Wrap from "@layout/account-wrapper/";
import ForgotPassword from "@page/auth/forgot-password/";

const ForgotPasswordPage = () => {
  return (
    <Layout hideHeader>
      <Seo title="Forgot Password" desc="Lorem ipsum dolor sit amet" />
      <main className="main">
        <Wrap>
          <ForgotPassword />
        </Wrap>
      </main>
    </Layout>
  );
};

export default ForgotPasswordPage;
