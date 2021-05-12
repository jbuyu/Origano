import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import { format } from "date-fns";
import { FcCheckmark } from "react-icons/fc";
import { GiCrossMark } from "react-icons/gi";
import ErrorMessage from "../ErrorMessage";
import { HashLoader, PropagateLoader } from "react-spinners";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import { listMyOrders } from "../../actions/orderActions";

export const ProfileScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [color, setColor] = useState("#FCA5A5");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { orders, loading: loadingOrders, error: errorOrders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, history, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setTimeout(() => {
        setMessage("");
      }, 1000);
    } else {
      let userData = {
        id: user._id,
        name,
        email,
        password,
      };
      dispatch(updateUserProfile(userData));
      // console.log(userData);
    }
    //submit
  };
  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col lg:w-1/2 xl:max-w-screen-sm">
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <div className="mt-12">
            <div className="mt-2 flex flex-row justify-center items-center ">
              {message && (
                <span className="text-sm bg-red-300 rounded-lg px-10 py-2 mb-4">
                  {message}
                </span>
              )}
              {success && (
                <span className="text-sm bg-green-400 rounded-lg px-10 py-2 mb-4">
                  Profile Updated
                </span>
              )}
            </div>
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
                    Name
                  </div>
                </div>
                <input
                  className="w-full text-lg py-2 px-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 rounded-sm"
                  type="text"
                  placeholder="Enter names"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Password
                  </div>
                </div>
                <input
                  className="w-full text-lg py-2 px-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 rounded-sm"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Confirm Password
                  </div>
                </div>
                <input
                  className="w-full text-lg py-2 px-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 rounded-sm"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>

              <div className="m-10">
                <button
                  onClick={submitHandler}
                  className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg"
                >
                  Update
                </button>
              </div>
            </form>
            <div className="flex flex-row justify-center itemds-center">
              {loading && <HashLoader color={color}></HashLoader>}
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-col items-center ">
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          {loadingOrders ? (
            <PropagateLoader />
          ) : errorOrders ? (
            <span className="p-4">{errorOrders}</span>
          ) : (
            // orders.map(order=>(
            //   <span key={order._id} >{order.paymentMethod}</span>
            // ))
            <div className="min-h-screen flex items-center px-4">
              <div className=" w-full">
                <table className="mx-auto max-w-5xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr className="text-gray-600 text-left">
                      <th className="font-semibold text-sm uppercase px-6 py-4">
                        ID
                      </th>
                      <th className="font-semibold text-sm uppercase px-6 py-4">
                        DATE
                      </th>
                      <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                        TOTAL
                      </th>
                      <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                        PAID
                      </th>
                      <th className="font-semibold text-sm uppercase px-6 py-4">
                        DELIVERED
                      </th>
                      <th className="font-semibold text-sm uppercase px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map(
                      ({ _id, createdAt, isPaid, isDelivered, totalPrice }) => (
                        <tr key={_id}>
                          <td className="px-6 py-4">
                            <p className="">{_id}</p>
                          </td>
                          <td className="px-6 py-4 text-center">
                            {format(new Date(createdAt), "yyyy-MM-dd")}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {totalPrice} /-
                          </td>

                          <td className="px-6 py-4 text-center">
                            {isPaid ? (
                              <span className="text-green-800 bg-green-200 font-semibold px-2 rounded-full">
                                Paid
                              </span>
                            ) : (
                              <span className="text-red-400 bg-green-200 font-semibold px-2 rounded-full">
                                Due
                              </span>
                            )}
                          </td>
                          <td className=" flex items-center justify-center px-6 py-4 text-center">
                            {isDelivered ? <FcCheckmark /> : <GiCrossMark />}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Link to = "/details" >
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" >Details</button>
                            </Link>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
