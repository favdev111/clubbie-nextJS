import React, { useState } from "react";
import styles from "./bankcard.module.css";
import DirectedButton from "@sub/button-directed";
import BackDropLoader from "@sub/backdrop-loader";
import ConfirmDialog from "@sub/confirm-dialog";
import Mastercard from "@svg/mastercard";
import TrashSVG from "@svg/thrash";
import Auth from "@api/services/Auth";
import authUser from "@utils/helpers/auth";

function BankCard({ payMethod, setUser, showNotificationMsg }) {
  const [loading, setLoading] = useState(false);
  const [askForConfirmation, setAskForConfirmation] = useState(false);

  const handleSetDefaultClick = async () => {
    setLoading(true);

    const response = await Auth.SetDefaultPaymentMethod(payMethod?.id).catch(
      () => null
    );
    if (!response) {
      showNotificationMsg("Failed to set payment method as default", {
        variant: "error",
        displayIcon: true,
      });
      setLoading(false);
      return;
    }
    showNotificationMsg("Pay Method set as default", {
      variant: "success",
      displayIcon: true,
    });
    setUser(response?.data);
    authUser.setUser(response?.data);
    setLoading(false);
  };

  const handleRemovePayMethodClick = async () => {
    setLoading(true);

    const response = await Auth.RemovePaymentMethod(payMethod?.id).catch(
      () => null
    );
    if (!response) {
      showNotificationMsg("Failed to remove payment method", {
        variant: "error",
        displayIcon: true,
      });
      setLoading(false);
      return;
    }
    showNotificationMsg("Pay Method removed successfully", {
      variant: "success",
      displayIcon: true,
    });

    setUser(response?.data);
    authUser.setUser(response?.data);
    setLoading(false);
  };

  return (
    <>
      <ConfirmDialog
        open={askForConfirmation}
        setOpen={setAskForConfirmation}
        message="Are you sure to remove this payment method? Don't worry you can still add it later."
        confirmText="Yes, Remove"
        onConfirm={handleRemovePayMethodClick}
      ></ConfirmDialog>
      {loading && <BackDropLoader />}
      <div className={styles.bankcard}>
        <div className={styles.bankcardInner}>
          <p className={styles.bankcardNo}>
            {"**** **** **** " + payMethod?.card?.last4}
          </p>
          <div className={styles.bankcardExp}>
            <p className="opacity-50">EXP</p>
            <p>
              {payMethod?.card?.exp_month}/{payMethod?.card?.exp_year}
            </p>
          </div>
          {payMethod?.card?.brand === "visa" && <Mastercard />}
        </div>
        <div className={styles.bankcardDefault}>
          {payMethod?.isDefault ? (
            <p className="opacity-50">Default</p>
          ) : (
            <DirectedButton
              appearence="bank"
              direction="forward"
              onClick={handleSetDefaultClick}
            >
              Set Default
            </DirectedButton>
          )}
          <div
            className={styles.deleteIcon}
            onClick={() => setAskForConfirmation(true)}
          >
            <TrashSVG />
          </div>
        </div>
      </div>
    </>
  );
}

export default BankCard;
