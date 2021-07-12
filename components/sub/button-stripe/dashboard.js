import React, { useState } from "react";
import router from "next/router";
import useNotification from "@sub/hook-notification";
import Auth from "@api/services/Auth";
import StripeBaseButton from "./base";

const StripeDashboardButton = () => {
  const [loading, setLoading] = useState(false);

  const { showNotificationMsg } = useNotification();

  const handleClick = async () => {
    setLoading(true);

    const response = await Auth.StripeDashboard().catch((e) => {
      if (e?.response?.status === 400) {
        return {
          error: e?.response?.data?.message,
        };
      }
      return null;
    });
    if (!response || response?.error) {
      showNotificationMsg(
        response?.error || "Error Redirecting to Stripe Dashboard",
        {
          variant: "error",
          displayIcon: true,
        }
      );
      setLoading(false);
      return;
    }
    showNotificationMsg("Redirecting to Stripe Dashboard.!", {
      variant: "success",
      displayIcon: true,
    });
    const dashboardURL = response?.data?.url;
    router.push(dashboardURL); // redirect to stripe dashboard
    setLoading(false);
  };

  return (
    <StripeBaseButton
      btnText="Dashboard"
      loading={loading}
      handleClick={handleClick}
    ></StripeBaseButton>
  );
};
export default StripeDashboardButton;
