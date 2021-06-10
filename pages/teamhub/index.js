import React from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import DashboardContent from "@page/teamhub-dashboard";

function TeamhubDashboard({ teamhubData }) {
  return (
    <Layout>
      <Seo title="Dashboard" desc="Lorem ipsum dolor sit amet" />
      <DashboardContent data={teamhubData} />
    </Layout>
  );
}

export default TeamhubDashboard;

export const getStaticProps = async () => {
  const teamhubData = {
    dashboard: {},
    events: [],
    payments: [],
    statistics: [],
  };
  return {
    props: {
      teamhubData,
    },
  };
};
