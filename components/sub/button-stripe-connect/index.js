import React, { useState } from "react";
import router from "next/router";
import cn from "classnames";
import useNotification from "@sub/hook-notification";
import Auth from "@api/services/Auth";
import StripeSVG from "@svg/stripe";
import styles from "./button.module.css";

const StripeConnectButton = ({ btnText, refreshURLPath, returnURLPath }) => {
  const [loading, setLoading] = useState(false);

  const { showNotificationMsg } = useNotification();
  const url = (path, type) =>
    `${window.location.origin}${path}?stripeConnect=${type}`;

  const handleConnectClick = async () => {
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
    <>
      <button
        type="button"
        onClick={handleConnectClick}
        className={cn(styles.btn, loading && styles.btnDisabled)}
        disabled={loading}
      >
        <div className={styles.btnContent}>
          {loading && <div className={styles.loading}></div>}
          <span className={styles.btnBody}>
            <span className={styles.btnText}>{btnText || "Connect with"}</span>
            <span className={styles.btnIcon}>
              <StripeSVG variant="light" />
            </span>
          </span>
        </div>
      </button>
    </>
  );
};
export default StripeConnectButton;
