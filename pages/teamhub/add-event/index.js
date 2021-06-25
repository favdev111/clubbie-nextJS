import React from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import AddEvent from "@page/teamhub-dashboard/tabs/add-event";

function AddNewEvent() {
  return (
    <Layout>
      <Seo title="Dashboard" desc="Lorem ipsum dolor sit amet" />
      <AddEvent />
    </Layout>
  );
}

export default AddNewEvent;
