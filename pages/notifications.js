import React from "react";
import Layout from "@layout";
import Seo from "@layout/seo";
import Notifications from "@page/notifications/";

function NotificationPage() {
  return (
    <Layout>
      <Seo title="Notifications" desc="Notifications List View" />
      <Notifications />
    </Layout>
  );
}

export default NotificationPage;
