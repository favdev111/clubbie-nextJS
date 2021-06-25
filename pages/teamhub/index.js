import React, { useState, useEffect } from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import DashboardContent from "@page/teamhub-dashboard";
import Clubs from "@api/services/Clubs";
import HTTPClient from "@api/HTTPClient";
import Router from "next/router";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import auth from "@utils/helpers/auth";
import { parseCookies } from "@utils/helpers/parseCookies";

function TeamhubDashboard({ requiredCookiesToSet, token, clubs }) {
  const [activeTeam, setTeam] = useState(0);

  // set cookies on client
  if (requiredCookiesToSet?.tokens) {
    auth.setAccessToken(requiredCookiesToSet.tokens.access.token, {
      expires: new Date(requiredCookiesToSet.tokens.access.expiry),
    });
    auth.setRefreshToken(requiredCookiesToSet.tokens.refresh.token, {
      expires: new Date(requiredCookiesToSet.tokens.refresh.expiry),
    });
  }

  const authUser = auth.getUser();
  useEffect(() => {
    if (authUser?.clubs.length === 0) {
      Router.push("./teamhub/initial");
    }
  }, [authUser]);

  return (
    <Layout>
      <Seo title="Dashboard" desc="Lorem ipsum dolor sit amet" />
      <DashboardContent
        activeTeam={activeTeam}
        setTeam={setTeam}
        token={token}
        user={authUser}
      ></DashboardContent>
    </Layout>
  );
}

export default TeamhubDashboard;

export const getServerSideProps = requiresPageAuth(async (ctx) => {
  const requiredCookiesToSet = {
    tokens: ctx.setCookieForTokens || false,
    /* Not done yet */
  };

  const cookies = parseCookies(ctx.req);

  HTTPClient.setHeader("Authorization", `Bearer ${cookies.access_token}`);

  const response = await Clubs.Fetch();
  const clubs = response.data;

  return {
    props: {
      requiredCookiesToSet,
      clubs: clubs.results,
      token: cookies.access_token,
    },
  };
});
