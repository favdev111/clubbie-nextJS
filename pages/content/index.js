import React from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import auth from "@utils/helpers/auth";
import { parseCookies } from "@utils/helpers/parseCookies";
import HTTPClient from "@api/HTTPClient";
import Content from "@page/content";

function ContentAdd({ requiredCookiesToSet, user }) {
  // set cookies on client
  if (requiredCookiesToSet?.tokens) {
    auth.setAccessToken(requiredCookiesToSet.tokens.access.token, {
      expires: new Date(requiredCookiesToSet.tokens.access.expiry),
    });
    auth.setRefreshToken(requiredCookiesToSet.tokens.refresh.token, {
      expires: new Date(requiredCookiesToSet.tokens.refresh.expiry),
    });
  }

  return (
    <Layout>
      <Seo title="Add Content Profile" desc="Lorem ipsum dolor sit amet" />
      <Content profile={user.profile} isPublic addMode />
    </Layout>
  );
}

export default ContentAdd;

export const getServerSideProps = requiresPageAuth(async (ctx) => {
  const requiredCookiesToSet = {
    tokens: ctx.setCookieForTokens || false,
  };

  const cookies = parseCookies(ctx.req);
  HTTPClient.setHeader("Authorization", `Bearer ${cookies.access_token}`);
  const user = (() => {
    return typeof cookies.user === "string"
      ? JSON.parse(cookies.user)
      : cookies.user;
  })();

  return {
    props: {
      user,
    },
  };
});
