import React from "react";
import Layout from "@layout/index";
import Seo from "@layout/seo";
import EditEvent from "@page/teamhub/main/events/edit";
import Users from "@api/services/Users";
import Events from "@api/services/Events";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";

function EditEventPage({ user, event }) {
  return (
    <Layout>
      <Seo title="Edit Event" desc="Lorem ipsum dolor sit amet" />
      <EditEvent user={user} event={event} />
    </Layout>
  );
}

export default EditEventPage;

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
