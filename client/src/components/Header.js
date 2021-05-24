import React from "react";
import Logo from "../icons/hop.svg";
import { Link } from "react-router-dom";
import { FaBars, FaCartArrowDown } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const btnClick = () => {
    // console.log("howdy");
  };
  const logOutHandler = () => {
    console.log("out");
    dispatch(logout());
  };
  return (
    <header className="lg:px-16 px-6 bg-white flex flex-wrap items-center lg:py-0 py-2 ">
      <div className="flex-1 flex justify-between items-center">
        <Link to="/">
          <img className="h-16 w-16 p-1" src={Logo} alt="logo" />
        </Link>
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
              <Link
                className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
                to="/cart"
              >
                <button className="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
                  <FaCartArrowDown />
                </button>
                CART
              </Link>
            </li>
            {userInfo && !userInfo.isAdmin ? (
              <div>
                <div className="py-10">
                  <div className="dropdown inline-block relative">
                    <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded inline-flex items-center">
                      <span className="mr-1 flex flex-row items-center justify-between">
                        <CgProfile
                          className="rounded-full w-10 h-10 border-2 border-transparent hover:border-indigo-400 mr-1"
                          alt="profile-imag"
                        />
                        {userInfo.name.split(" ")[1]
                          ? userInfo.name.split(" ")[1]
                          : userInfo.name}
                      </span>
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </button>
                    <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
                      <li className="">
                        <Link
                          to="/profile"
                          className="bg-gray-200 hover:bg-gray-400 py-2 px-12 block whitespace-no-wrap"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={logOutHandler}
                          className="bg-gray-200 hover:bg-gray-400 py-2 px-12 block whitespace-no-wrap w-full"
                          to="/logout"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : userInfo && userInfo.isAdmin ? (
              <div>
                <div className="py-10">
                  <div className="dropdown inline-block relative">
                    <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded inline-flex items-center">
                      <span className="mr-1 flex flex-row items-center justify-between">
                        <CgProfile
                          className="rounded-full w-10 h-10 border-2 border-transparent hover:border-indigo-400 mr-1"
                          alt="profile-imag"
                        />
                        Admin
                      </span>
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </button>
                    <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
                      <li className="">
                        <Link
                          to="/admin/userlist"
                          className="bg-gray-200 hover:bg-gray-400 py-2 px-12 block whitespace-no-wrap"
                        >
                          Users
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          to="/admin/productList"
                          className="bg-gray-200 hover:bg-gray-400 py-2 px-12 block whitespace-no-wrap"
                        >
                          Products
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          to="/admin/orderList"
                          className="bg-gray-200 hover:bg-gray-400 py-2 px-12 block whitespace-no-wrap"
                        >
                          Orders
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={logOutHandler}
                          className="bg-gray-200 hover:bg-gray-400 py-2 px-12 block whitespace-no-wrap w-full"
                          to="/logout"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400 lg:mb-0 mb-2"
                to="/login"
              >
                SIGN IN
              </Link>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;
