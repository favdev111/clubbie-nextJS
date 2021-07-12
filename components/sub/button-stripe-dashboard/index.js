import React, { useState } from "react";
import router from "next/router";
import cn from "classnames";
import useNotification from "@sub/hook-notification";
import Auth from "@api/services/Auth";
import StripeSVG from "@svg/stripe";
import styles from "./button.module.css";

const StripeDashboardButton = () => {
  const [loading, setLoading] = useState(false);

  const { showNotificationMsg } = useNotification();

  const handleDashboardClick = async () => {
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
    <>
      <button
        type="button"
        onClick={handleDashboardClick}
        className={cn(styles.btn, loading && styles.btnDisabled)}
        disabled={loading}
      >
        <div className={styles.btnContent}>
          {loading && <div className={styles.loading}></div>}
          <span className={styles.btnBody}>
            <span className={styles.btnText}>{"Dashboard"}</span>
            <span className={styles.btnIcon}>
              <StripeSVG variant="light" />
            </span>
          </span>
        </div>
      </button>
    </>
  );
};
export default StripeDashboardButton;
