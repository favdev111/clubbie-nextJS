import React from "react";
import cn from "classnames";
import StripeSVG from "@svg/stripe";
import styles from "./button.module.css";

const StripeBaseButton = ({ btnText, variant, loading, handleClick }) => {
  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          styles.btn,
          variant === "danger" && styles.btnDanger,
          loading && styles.btnDisabled
        )}
        disabled={loading}
      >
        <div className={styles.btnContent}>
          {loading && <div className={styles.loading}></div>}
          <span className={styles.btnBody}>
            <span className={styles.btnText}>{btnText}</span>
            <span className={styles.btnIcon}>
              <StripeSVG variant="light" />
            </span>
          </span>
        </div>
      </button>
    </>
  );
};
export default StripeBaseButton;
