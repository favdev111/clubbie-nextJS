import React from "react";
import ForwardButton from "../ForwardButton/ForwardButton";

function BankCard({ data }) {
  return (
    <div className="bank-card">
      <div className="bank-card__inner">
        <p className="bank-card-no">**** **** **** 6574</p>
        <div className="bank-card__exp">
          EXP<p>10/12</p>
        </div>
        <img src={require("../../../public/assets/mastercard.svg")} />
      </div>
      <div className="bank-card__default">
        {data.default ? (
          <p className="bank-card__default__text">Default</p>
        ) : (
          <ForwardButton appearence="bank"> Set Default</ForwardButton>
        )}
      </div>
    </div>
  );
}

export default BankCard;
