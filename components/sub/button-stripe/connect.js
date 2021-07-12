import React, { useState } from "react";
import router from "next/router";
import useNotification from "@sub/hook-notification";
import Auth from "@api/services/Auth";
import StripeBaseButton from "./base";

const StripeConnectButton = ({ btnText, refreshURLPath, returnURLPath }) => {
  const [loading, setLoading] = useState(false);

  const { showNotificationMsg } = useNotification();
  const url = (path, type) =>
    `${window.location.origin}${path}?stripeConnect=${type}`;

  const handleClick = async () => {
    setLoading(true);

    const response = await Auth.StripeConnect({
      returnURL: url(returnURLPath || "/profile/self", "success"),
      refreshURL: url(refreshURLPath || "/profile/self", "failed"),
    }).catch((e) => {
      if (e?.response?.status === 400) {
        return {
          error: e?.response?.data?.message,
        };
      }
      return null;
    });
    if (!response || response?.error) {
      showNotificationMsg(response?.error || "Error connecting to Stripe", {
        variant: "error",
        displayIcon: true,
      });
      setLoading(false);
      return;
    }
    showNotificationMsg("Connection made. Redirecting to Stripe..!", {
      variant: "success",
      displayIcon: true,
    });
    const onBoardingURL = response?.data?.url;
    router.push(onBoardingURL); // redirect to stripe onboarding
    setLoading(false);
  };

  return (
    <StripeBaseButton
      btnText={btnText || "Connect with"}
      loading={loading}
      handleClick={handleClick}
    />
  );
};
export default StripeConnectButton;
