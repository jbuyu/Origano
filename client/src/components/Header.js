import React from "react";
import Logo from "../icons/logo.svg";
import { FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
const Header = () => {
  const btnClick = () => {
    // console.log("howdy");
  };
  return (
    <header className="lg:px-16 px-6 bg-white flex flex-wrap items-center lg:py-0 py-2">
      <div className="flex-1 flex justify-between items-center">
        <a href="#">
          <img className="h-1/6 w-1/6" src={Logo} alt="logo" />
        </a>
      </div>

      <label htmlFor="menu-toggle" className="cursor-pointer lg:hidden block">
        <FaBars
          className="text-2xl fill-current text-gray-900"
          onClick={btnClick}
        />
      </label>
      <input className="hidden" type="checkbox" id="menu-toggle" />

      <div
        className="hidden lg:flex lg:items-center lg:w-auto w-full"
        id="menu"
      >
        <nav>
          <ul className="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
            <li>
              <a
                className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
                href="#"
              >
                Features
              </a>
            </li>
            <li>
              <a
                className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
                href="#"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
                href="#"
              >
                Documentation
              </a>
            </li>
            <li>
              <a
                className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400 lg:mb-0 mb-2"
                href="#"
              >
                Support
              </a>
            </li>
          </ul>
        </nav>
        <a
          href="#"
          className="lg:ml-4 flex items-center justify-start lg:mb-0 mb-4 cursor-pointer"
        >
          <CgProfile
            className="rounded-full w-10 h-10 border-2 border-transparent hover:border-indigo-400"
            alt="profile-imag"
          />
        </a>
      </div>
    </header>
  );
};
export default Header;
