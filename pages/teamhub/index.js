import React from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import DashboardContent from "@page/teamhub-dashboard";

function TeamhubDashboard() {
  return (
    <Layout>
      <Seo title="Dashboard" desc="Lorem ipsum dolor sit amet" />
      <DashboardContent />
    </Layout>
  );
}

export default TeamhubDashboard;
