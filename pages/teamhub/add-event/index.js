import React from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import AddEvent from "@page/teamhub-dashboard/tabs/add-event";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import auth from "@utils/helpers/auth";
import { parseCookies } from "@utils/helpers/parseCookies";

function AddNewEvent({ requiredCookiesToSet, teams }) {
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

  return (
    <Layout>
      <Seo title="Dashboard" desc="Lorem ipsum dolor sit amet" />
      <AddEvent user={authUser} />
    </Layout>
  );
}

export default AddNewEvent;

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
