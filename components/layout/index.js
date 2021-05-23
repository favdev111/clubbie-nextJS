import React from "react";

function Layout({ showFooter, showHeader }) {
  return (
    <div>
      {/* Head */}
      <Head />
      {/* Body */}
      {showHeader && <Header />}

      {children}

      {showFooter && <Footer />}
    </div>
  );
}

export default Layout;
