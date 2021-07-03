import React from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import AddEvent from "@page/teamhub-dashboard/tabs/add-event";
import { requiresPageAuth } from "@utils/middlewares/requiresPageAuth";
import auth from "@utils/helpers/auth";

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
