import React, { useState, useEffect } from "react";
import router from "next/router";
import OvalButton from "@sub/button-oval";
import useNotification from "@sub/hook-notification";
import BackDropLoader from "@sub/backdrop-loader";
import Auth from "@api/services/Auth";
import Users from "@api/services/Users";
import authUser from "@utils/helpers/auth";
import BankCard from "./card";
import styles from "./connectedbanks.module.css";

function ConnectedBanks() {
  const [user, setUser] = useState(authUser.getUser());
  const [loading, setLoading] = useState(false);
  const [backdropLoading, setBackdropLoading] = useState(false);
  const [stripeCustomer, setStripeCustomer] = useState(null);

  const { showNotificationMsg } = useNotification();

  useEffect(() => {
    if (user?.stripe?.customer) {
      setStripeCustomer(user?.stripe?.customer);
    }
  }, [user]);

  const getUpdatedStripeInfo = async () => {
    const currentPayMethods = stripeCustomer?.paymentMethods;
    const response = await Users.GetUserProfile(user?.id).catch(() => null);
    if (!response) {
      showNotificationMsg("Failed to add new payment method.", {
        variant: "error",
        displayIcon: true,
      });
      return;
    }
    const updatedUser = response?.data;
    if (
      updatedUser?.stripe?.customer?.paymentMethods?.length ===
      currentPayMethods?.length
    ) {
      showNotificationMsg("Failed to add new payment method.", {
        variant: "error",
        displayIcon: true,
      });
      return;
    }
    showNotificationMsg("Payment method added successfully.", {
      variant: "success",
      displayIcon: true,
    });
    authUser.setUser(updatedUser);
    setUser(updatedUser);
    return;
  };

  useEffect(async () => {
    const sessionId = router?.query?.session_id;
    if (sessionId) {
      setLoading(true);
      await getUpdatedStripeInfo();
      setLoading(false);
    }
  }, [showNotificationMsg]);

  const handleAddNewPayMethod = async () => {
    setLoading(true);

    const url = (path) => `${window.location.origin}${path}`;

    const response = await Auth.AddPaymentMethod({
      successURL: url("/profile/self/connected-banks"),
      cancelURL: url("/profile/self/connected-banks"),
    }).catch(() => null);
    if (!response) {
      showNotificationMsg("Error fetching Stripe Session Link", {
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
    const payMethodSessionURL = response?.data?.url;
    router.push(payMethodSessionURL); // redirect to stripe session
    setLoading(false);
  };

  return (
    <>
      {backdropLoading && <BackDropLoader />}
      <div className={styles.connectedbanks}>
        <div className={styles.connectedbanksTitle}>
          <h1> Connected Bank Accounts</h1>
        </div>
        <div className={styles.connectedbanksBody}>
          {stripeCustomer && stripeCustomer?.paymentMethods?.length > 0 ? (
            <>
              <div className={styles.connectedbanksBodyInner}>
                {stripeCustomer.paymentMethods.map((payMethod, index) => (
                  <BankCard
                    key={"bankcard" + index}
                    setUser={setUser}
                    showNotificationMsg={showNotificationMsg}
                    payMethod={{
                      ...payMethod,
                      isDefault:
                        stripeCustomer?.defaultPayMethodId === payMethod?.id
                          ? true
                          : false,
                    }}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className={styles.noBankAccounts}>
              <p>
                You dont have any bank accounts connected. Add a new one from
                the button below
              </p>
            </div>
          )}
          <div className={styles.connectedbanksButton}>
            <OvalButton
              theme="bank"
              loading={loading}
              onClick={handleAddNewPayMethod}
            >
              Add New
            </OvalButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConnectedBanks;
