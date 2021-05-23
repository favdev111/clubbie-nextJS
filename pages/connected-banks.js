import React from "react";
import Header from "@layout/header/";
import ConnectedBanks from "@page/connected-banks/";

function ConnectedBanksPage() {
  return (
    <div className="container">
      <Header />
      <ConnectedBanks />
    </div>
  );
}

export default ConnectedBanksPage;
