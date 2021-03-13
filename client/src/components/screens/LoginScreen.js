import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import { HashLoader } from "react-spinners";
import { login } from "../../actions/userActions";

export const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("#FCA5A5");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    //submit
  };
  return (
    <div className="lg:flex flex flex-row justify-center items-center">
      <div className="lg:w-1/2 xl:max-w-screen-sm">
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">
            <span className="flex flex-row justify-between items-center">
              Log in
              <img src="log.png" alt="log_in" />
            </span>
          </h2>
          <div className="mt-12">
            <form onSubmit={submitHandler}>
              <div>
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Email Address
                </div>
                <input
                  className="w-full text-lg py-2 px-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 rounded-sm"
                  type="email"
                  placeholder="guadalupe@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Password
                  </div>
                  <div>
                    <Link
                      to="/reset"
                      className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <input
                  className="w-full text-lg py-2 px-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 rounded-sm"
                  type="text"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="mt-10">
                <button className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg">
                  Log In
                </button>
              </div>
            </form>
            <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
              Don't have an account ?
              <Link
                to="register"
                // to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="cursor-pointer text-indigo-600 hover:text-indigo-800 ml-1"
              >
                Register
              </Link>
            </div>
            <div className="flex flex-row justify-center itemds-center">
              {loading && <HashLoader color={color}></HashLoader>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
