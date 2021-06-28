import React from "react";
import Seo from "./seo";
import Header from "./header";

function Layout({ children, showFooter, hideHeader }) {
  return (
    <>
      <Seo />
      {/* Body */}
      {!hideHeader && <Header />}

      {children}

      {/*       {showFooter && <Footer />} */}
    </>
  );
}

export default Layout;
