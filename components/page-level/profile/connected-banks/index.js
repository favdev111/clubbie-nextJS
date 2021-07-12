import React, { useState } from "react";
import router from "next/router";
import OvalButton from "@sub/button-oval";
import useNotification from "@sub/hook-notification";
import Auth from "@api/services/Auth";
import BankCard from "./card";
import styles from "./connectedbanks.module.css";

function ConnectedBanks() {
  const data = [
    {
      id: 0,
      exp: "10/12",
      card: "**** **** **** 6574",
      default: true,
    },
    {
      id: 0,
      exp: "10/12",
      card: "**** **** **** 5433",
      default: false,
    },
  ];

  const [loading, setLoading] = useState(false);
  const { showNotificationMsg } = useNotification();

  const handleAddNewPayMethod = async () => {
    setLoading(true);

    const url = (path, type) =>
      `${window.location.origin}${path}?stripePaymentMethod=${type}`;

    const response = await Auth.AddPaymentMethod({
      successURL: url("/profile/self/connected-banks", "success"),
      cancelURL: url("/profile/self/connected-banks", "failed"),
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
    <div className={styles.connectedbanks}>
      <div className={styles.connectedbanksTitle}>
        <h1> Connected Bank Accounts</h1>
      </div>
      <div className={styles.connectedbanksBody}>
        <div className={styles.connectedbanksBodyInner}>
          {data.map((card, index) => (
            <BankCard key={"bankcard" + index} data={card} />
          ))}
        </div>
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
  );
}

export default ConnectedBanks;
