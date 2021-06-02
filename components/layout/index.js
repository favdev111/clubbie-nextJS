import React from "react";
import Seo from "./seo";
import Header from "./header";

function Layout({ children, showFooter, hideHeader }) {
  return (
    <main>
      <Seo />
      {/* Body */}
      {!hideHeader && <Header />}

      {children}

      {/*       {showFooter && <Footer />} */}
    </main>
  );
}

export default Layout;
