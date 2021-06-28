import React, { useState } from "react";
import Layout from "@layout";
import router from "next/router";
import Seo from "@layout/seo";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import auth from "@utils/helpers/auth";
import DashboardContent from "@page/teamhub-dashboard";

function EventDetailPage({ user, requiredCookiesToSet }) {
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
        eventId={router.router.query.id}
      ></DashboardContent>
    </Layout>
  );
}

export default EventDetailPage;

export const getServerSideProps = requiresPageAuth();
