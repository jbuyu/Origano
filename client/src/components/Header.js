import React from "react";
import Logo from "../icons/logo.svg";
const Header = () => {
  return (
    <header className="lg;px-16 px-6 bg-white flex flex-wrap items-centerlg:py-0 py-2">
      <div className="flex-1 flex justify-between items-center">
        <a href="#">
          <img className="h-1/5 w-1/5" src={Logo} alt="logo" />
        </a>
      </div>
    </header>
  );
};
export default Header;
