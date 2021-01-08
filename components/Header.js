import React from "react";
import Link from "next/link";

const Header = () => (
  <nav className="header">
    <Link href="/">
      <a>Home</a>
    </Link>

    <style jsx>{`
      nav {
        text-align: center;
      }
    `}</style>
  </nav>
);

export default Header;
