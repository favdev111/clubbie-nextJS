import React from "react";
import BankCard from "../UI/BankCard/BankCard";
import OvalButton from "../UI/OvalButton/OvalButton";

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
  return (
    <div className="connected-banks">
      <div className="connected-banks__title">
        <h1> Connected Bank Accounts</h1>
      </div>
      <div className="connected-banks__body">
        <div className="connected-banks__body__inner">
          {data.map((card) => (
            <BankCard data={card} />
          ))}
        </div>
        <div className="connected-banks__button">
          <OvalButton theme="bank">Add New</OvalButton>
        </div>
      </div>
    </div>
  );
}

export default ConnectedBanks;
