import React from "react";
import router from "next/router";
import Layout from "@layout";
import Seo from "@layout/seo";
import Wrap from "@layout/account-wrapper/";
import Login from "@page/auth/login";
import auth from "@utils/helpers/auth";

const LoginPage = ({ previousURL }) => {
  const authUserAccess = auth.getAccessToken();
  if (authUserAccess) {
    router.push("/");
  }

  return (
    <Layout hideHeader>
      <Seo
        title="Clubbie Login"
        desc="Clubbie Account Login - Raising The Bar For Amateur Sports"
      />
      <main className="main">
        <Wrap>
          <Login previousURL={previousURL} />
        </Wrap>
      </main>
    </Layout>
  );
};
export default LoginPage;

export const getServerSideProps = async (ctx) => {
  const previousURL = ctx?.req?.headers?.referer;

  return {
    props: {
      previousURL: !previousURL?.includes("auth/") || false,
    },
  };
};
