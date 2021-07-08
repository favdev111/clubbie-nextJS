import React from "react";
import Layout from "../../../../components/layout/index";
import Seo from "../../../../components/layout/seo";
import AddEvent from "../../../../components/page-level/teamhub-dashboard/tabs/add-event";
import { requiresPageAuth } from "../../../../utils/middlewares/requiresPageAuth";
import auth from "../../../../utils/helpers/auth";

function AddNewEvent() {
  const authUser = auth.getUser();

  return (
    <Layout>
      <Seo title="Dashboard" desc="Lorem ipsum dolor sit amet" />
      <AddEvent user={authUser} />
    </Layout>
  );
}

export default AddNewEvent;

export const getServerSideProps = requiresPageAuth();