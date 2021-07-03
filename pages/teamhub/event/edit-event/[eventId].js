import React from "react";
import Layout from "../../../../components/layout/index";
import Seo from "@layout/seo";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import auth from "@utils/helpers/auth";
import EditEvent from "@page/teamhub-dashboard/tabs/edit-event";

function EditEventPage({ activeTeam }) {
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

export const getServerSideProps = requiresPageAuth();
