import React from "react";
import Header from "@layout/header";
import PitchBlock from "@c/PitchBlock";

const PitchPage = () => {
  return (
    <div className="container">
      <Header />
      <main>
        <PitchBlock />
      </main>
    </div>
  );
};

export default PitchPage;
