import React from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import DashboardContent from "@page/teamhub/main";
import Users from "@api/services/Users";
import Events from "@api/services/Events";

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

  const teamId = "611cd9d72f1ed04fc549f2f2"; // TODO: refactor api to not use teamId
  const responseEvent = await Events.GetEventById(eventId, teamId).catch(
    () => false
  );
  const event = responseEvent?.data;

  const notFound = !_user || !event;

  return {
    props: {
      user: _user,
      event: event,
    },
    notFound: notFound,
  };
});
