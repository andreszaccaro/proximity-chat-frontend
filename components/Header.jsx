import React from "react";
import Link from "next/link";

const Header = () => (
  <nav className="absolute z-10 w-full flex items-center justify-center">
    <Link href="/">
      <a className="mt-4 font-medium text-xl text-center text-gray-500 hover:text-gray-900">
        Home
      </a>
    </Link>
  </nav>
);

export default Header;
