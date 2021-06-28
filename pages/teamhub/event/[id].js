import React, { useState } from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import auth from "@utils/helpers/auth";
import DashboardContent from "@page/teamhub-dashboard";

function EventDetailPage({ user, requiredCookiesToSet, id }) {
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

  return (
    <Layout>
      <Seo title="User Profile" desc="Lorem ipsum dolor sit amet" />
      <DashboardContent
        activeTeam={activeTeam}
        setTeam={setTeam}
        user={user}
        eventId={id}
      ></DashboardContent>
    </Layout>
  );
}

export default EventDetailPage;

export const getServerSideProps = requiresPageAuth(async (ctx) => {
  const id = ctx.params.id;
  console.log(ctx.params);

  const requiredCookiesToSet = {
    tokens: ctx.setCookieForTokens || false,
  };
  return {
    props: {
      requiredCookiesToSet,
      id: id,
    },
  };
});
