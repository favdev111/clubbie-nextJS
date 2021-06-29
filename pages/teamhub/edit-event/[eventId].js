import React, { useEffect, useState } from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import auth from "@utils/helpers/auth";
import { parseCookies } from "@utils/helpers/parseCookies";
import EditEvent from "@page/teamhub-dashboard/tabs/edit-event";
import Teams from "@api/services/Teams";

function EditEventPage({ requiredCookiesToSet, activeTeam }) {
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
  const teamId = authUser?.teams[activeTeam].team;

  return (
    <Layout>
      <Seo title="Dashboard" desc="Lorem ipsum dolor sit amet" />
      <EditEvent activeTeam={teamId} user={authUser} />
    </Layout>
  );
}

export default EditEventPage;

export const getServerSideProps = requiresPageAuth(async (ctx) => {
  const requiredCookiesToSet = {
    tokens: ctx.setCookieForTokens || false,
    /* Not done yet */
  };

  const cookies = parseCookies(ctx.req);

  return {
    props: {
      requiredCookiesToSet,
      token: cookies.access_token,
    },
  };
});
