import React from "react";
import Header from "./Header";

const Layout = ({ children }) => (
  <div className="layout">
    <Header />
    {children}
    <style jsx>{``}</style>
  </div>
);

export default Layout;
