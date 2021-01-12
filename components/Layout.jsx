import React from "react";
import Header from "./Header";

const Layout = ({ children }) => (
  <div className="relative min-h-screen bg-white overflow-hidden">
    <Header />
    {children}
  </div>
);

export default Layout;
