import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import DirectedButton from "@sub/button-directed";
import StripeConnectButton from "@sub/button-stripe/connect";
import StripeDisconnectButton from "@sub/button-stripe/disconnect";
import StripeDashboardButton from "@sub/button-stripe/dashboard";
import ToolTip from "@sub/tooltip";
import useNotification from "@sub/hook-notification";
import BackDropLoader from "@sub/backdrop-loader";
import Users from "@api/services/Users";
import authUser from "@utils/helpers/auth";
import styles from "./banking.module.css";

function Banking({ user }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [_user, setUser] = useState(user);
  const { showNotificationMsg } = useNotification();

  const getUpdatedStripeInfo = async (connectStatus) => {
    const isOnboard = _user?.stripe?.connectedAccount?.isOnboard;
    if (connectStatus === "success" && !isOnboard) {
      const response = await Users.GetUserProfile(_user?.id).catch(() => null);
      if (!response) {
        showNotificationMsg("Stripe Onboarding Failed. Please Try Again 1.", {
          variant: "error",
          displayIcon: true,
          duration: 10000, // 10 sec
        });
        return;
      }
      const updatedUser = response?.data;
      console.log("updatedUser => ", updatedUser);
      const connectedAccount = updatedUser?.stripe?.connectedAccount;
      if (connectedAccount?.isOnboard && connectedAccount?.id) {
        showNotificationMsg("Connected with Stripe.", {
          variant: "success",
          displayIcon: true,
        });
        console.log("now update cookie");
        authUser.setUser(updatedUser);
        setUser(updatedUser);
      } else {
        showNotificationMsg("Stripe Onboarding Failed. Please Try Again.", {
          variant: "error",
          displayIcon: true,
          duration: 10000, // 10 sec
        });
      }
    }
    if (connectStatus === "failed" && !isOnboard) {
      showNotificationMsg("Stripe Onboarding Failed. Please Try Again.", {
        variant: "error",
        displayIcon: true,
        duration: 10000, // 10 sec
      });
    }
  };

  useEffect(async () => {
    const connectStatus = router?.query?.stripeConnect;
    if (connectStatus) {
      setLoading(true);
      await getUpdatedStripeInfo(connectStatus);
      setLoading(false);
    }
  }, [showNotificationMsg]);

  return (
    <div className={styles.bankingContent}>
      {loading && <BackDropLoader />}
      {!loading && _user?.stripe ? (
        _user?.stripe?.connectedAccount?.isOnboard ? (
          <>
            <div className={styles.bankingContentItem}>
              <StripeDisconnectButton
                onSuccess={(_updatedUser) => setUser(_updatedUser)}
              />
            </div>
            <div className={styles.bankingContentItem}>
              <StripeDashboardButton />
              <ToolTip text="Update your stripe account or get latest details about payouts to your bank" />
            </div>
          </>
        ) : (
          <div className={styles.bankingContentItem}>
            <StripeConnectButton />
            <ToolTip text="Want to receive payments from Clubbie? Connect with stripe" />
          </div>
        )
      ) : (
        <div className={styles.bankingContentItem}>
          <StripeConnectButton />
          <ToolTip text="Want to receive payments from Clubbie? Connect with stripe" />
        </div>
      )}
      <div className={styles.bankingContentItem}>
        <div className={styles.connectedBankAcc}>
          <Link href="/connected-banks">
            <a>
              <DirectedButton direction="forward">
                Connected Bank Accounts
              </DirectedButton>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Banking;
