import React from "react";
import Layout from "@layout/index";
import Seo from "@layout/seo";
import DashboardContent from "@page/teamhub/main";
import Users from "@api/services/Users";
import Events from "@api/services/Events";
import eventTypes from "@utils/fixedValues/eventTypes";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";

function MatchEventLineupPage({ user, event }) {
  return (
    <Layout>
      <Seo title="Event Lineup" desc="Lorem ipsum dolor sit amet" />
      <main>
        <DashboardContent user={user} event={event} />
      </main>
    </Layout>
  );
}

export default MatchEventLineupPage;

export const getServerSideProps = requiresPageAuth(async (ctx) => {
  const eventId = ctx.params.id;

  const responseProfile = await Users.GetMyProfile().catch(() => false);
  const _user = responseProfile?.data;

  const responseEvent = await Events.GetEventById(eventId).catch(() => false);
  const _event = responseEvent?.data;

  // validate if event type is match
  const isMatchEvent = _event?.eventType === eventTypes.MATCH;

  // validate if auth user can access this event
  const eventTeamIds = _event?.teams?.map((x) => x?.teamId?.id || x?.team?.id);
  const hasAccess = _user?.teams?.find((x) => eventTeamIds?.includes(x?.team));

  const notFound = !_user || !_event || !isMatchEvent || !hasAccess;

  return {
    props: {
      user: _user,
      event: _event,
    },
    notFound: notFound,
  };
});
