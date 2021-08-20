import React from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import DashboardContent from "@page/teamhub/main";
import Events from "@api/services/Events";
import Users from "@api/services/Users";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";

function EventDetailPage({ user, event }) {
  return (
    <Layout>
      <Seo title="Event Detail" desc="Lorem ipsum dolor sit amet" />
      <DashboardContent user={user} event={event}></DashboardContent>
    </Layout>
  );
}

export default EventDetailPage;

export const getServerSideProps = requiresPageAuth(async (ctx) => {
  const eventId = ctx.params.id;

  const responseProfile = await Users.GetMyProfile().catch(() => false);
  const _user = responseProfile?.data;

  const responseEvent = await Events.GetEventById(eventId).catch(() => false);
  const _event = responseEvent?.data;

  const notFound = !_user || !_event;

  return {
    props: {
      user: _user,
      event: { ..._event },
    },
    notFound: notFound,
  };
});
