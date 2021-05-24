import React from "react";
import Seo from "./seo";
import Header from "./header";

function Layout({ children, showFooter, hideHeader }) {
  return (
    <div>
      <Seo />
      {/* Body */}
      {!hideHeader && <Header />}

      {children}

      {/*       {showFooter && <Footer />} */}
    </div>
  );
}

export default Layout;
