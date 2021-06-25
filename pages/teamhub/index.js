import React, { useState } from "react";
import cookie from "js-cookie";
import { parseCookies } from "@utils/helpers/parseCookies";
import Cookies from "js-cookie";
import Layout from "@layout";
import Seo from "@layout/seo";
import DashboardContent from "@page/teamhub-dashboard";
import Clubs from "@api/services/Clubs";
import HTTPClient from "@api/HTTPClient";
import Router from "next/router";

import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";

function TeamhubDashboard({ requiredCookiesToSet, token, clubs }) {
  const [activeTeam, setTeam] = useState(0);

  if (requiredCookiesToSet?.tokens) {
    cookie.set("access_token", requiredCookiesToSet.tokens.access.token);
    cookie.set("refresh_token", requiredCookiesToSet.tokens.refresh.token, {
      expires: new Date(requiredCookiesToSet.tokens.refresh.expiry),
    });
  }
  const authUser =
    typeof Cookies.get("user") === "string"
      ? JSON.parse(decodeURI(Cookies.get("user")))
      : Cookies.get("user");

  if (authUser?.clubs.length == 0) {
    Router.push("./teamhub/initial");
  }
  if (authUser?.clubs.length > 0) {
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
  } else {
    return null;
  }
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
