import React, { useState } from "react";
import ConfirmDialog from "@sub/confirm-dialog";
import useNotification from "@sub/hook-notification";
import Auth from "@api/services/Auth";
import authUser from "@utils/helpers/auth";
import StripeBaseButton from "./base";

const StripeDisconnectButton = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const { showNotificationMsg } = useNotification();

  const handleClick = async () => {
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
    authUser.setUser(response?.data);
    await onSuccess(response?.data);
    setLoading(false);
  };

  return (
    <>
      <ConfirmDialog
        open={showConfirmDialog}
        setOpen={setShowConfirmDialog}
        message="Are you sure to disconnect your Stripe account from Clubbie? You will still retain your account but will not be able to receive further payments."
        confirmText="Yes, Disconnect"
        onConfirm={handleClick}
      />
      <StripeBaseButton
        btnText="Disconnect"
        variant="danger"
        loading={loading}
        handleClick={() => setShowConfirmDialog(!showConfirmDialog)}
      ></StripeBaseButton>
    </>
  );
};
export default StripeDisconnectButton;
