import React, { useState, useEffect } from "react";
import Layout from "@layout";
import { useRouter } from "next/router";
import Seo from "@layout/seo";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import DashboardContent from "@page/teamhub-dashboard";

function EventDetailPage({ user, activeTeam, setTeam }) {
  const [eventId, setEventId] = useState();
  const router = useRouter();

  useEffect(() => {
    setEventId(router.query.id);
  }, [router.query.id]);

  return (
    <Layout>
      <Seo title="User Profile" desc="Lorem ipsum dolor sit amet" />
      <DashboardContent
        activeTeam={activeTeam}
        setTeam={setTeam}
        user={user}
        eventId={eventId}
      ></DashboardContent>
    </Layout>
  );
}

export default EventDetailPage;

export const getServerSideProps = requiresPageAuth();
