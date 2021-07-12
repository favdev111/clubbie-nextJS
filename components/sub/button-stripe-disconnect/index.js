import React, { useState } from "react";
import cn from "classnames";
import ConfirmDialog from "@sub/confirm-dialog";
import useNotification from "@sub/hook-notification";
import Auth from "@api/services/Auth";
import authUser from "@utils/helpers/auth";
import StripeSVG from "@svg/stripe";
import styles from "./button.module.css";

const StripeDisconnectButton = () => {
  const [loading, setLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const { showNotificationMsg } = useNotification();

  const handleDisconnectClick = async () => {
    setLoading(true);

    const response = await Auth.StripeDisconnect().catch((e) => {
      if (e?.response?.status === 400) {
        return {
          error: e?.response?.data?.message,
        };
      }
      return null;
    });
    if (!response || response?.error) {
      showNotificationMsg(response?.error || "Failed to disconnect Stripe", {
        variant: "error",
        displayIcon: true,
      });
      setLoading(false);
      return;
    }
    showNotificationMsg("Stripe Disconnected Successfully.!", {
      variant: "success",
      displayIcon: true,
    });
    // update user with response
    console.log("update user => ", response);
    authUser.setUser(response?.data);
    setLoading(false);
  };

  return (
    <>
      <ConfirmDialog
        open={showConfirmDialog}
        setOpen={setShowConfirmDialog}
        message="Are you sure to disconnect your Stripe account from Clubbie? You will still retain your account but will not be able to receive further payments."
        confirmText="Yes, Disconnect"
        onConfirm={handleDisconnectClick}
      />
      <button
        type="button"
        onClick={() => setShowConfirmDialog(!showConfirmDialog)}
        className={cn(styles.btn, loading && styles.btnDisabled)}
        disabled={loading}
      >
        <div className={styles.btnContent}>
          {loading && <div className={styles.loading}></div>}
          <span className={styles.btnBody}>
            <span className={styles.btnText}>{"Disconnect"}</span>
            <span className={styles.btnIcon}>
              <StripeSVG variant="light" />
            </span>
          </span>
        </div>
      </button>
    </>
  );
};
export default StripeDisconnectButton;
