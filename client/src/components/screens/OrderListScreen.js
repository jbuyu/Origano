import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { listOrders } from "../../actions/orderActions";

import { PRODUCT_CREATE_RESET } from "../../constants/productConstants";

import { HashLoader } from "react-spinners";

import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { FaUserEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

export const OrderListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  //list
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  //auth
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push("/login");
    } else {
      dispatch(listOrders());
    }
  }, [dispatch, history, userInfo]);

  //fn
  const deleteHandler = (id) => {
    //id
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center mt-6">
          <HashLoader />
        </div>
      ) : error ? (
        <span className="flex justify-center items-center text-sm bg-red-300 rounded-lg px-4 py-2 mb-4">
          {error}
        </span>
      ) : (
        <div className="flex flex-grow items-center px-4">
          <div className=" w-full">
            <table className="mx-auto max-w-5xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
              <thead className="bg-gray-50">
                <tr className="text-gray-600 text-left">
                  <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                    ID
                  </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                    USER
                  </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                    DATE
                  </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                    TOTAL
                  </th>
                  <th className="font-semibold text-sm uppercase px-6 py-6 text-center">
                    PAID
                  </th>
                  <th className="font-semibold text-sm uppercase px-6 py-6 text-center">
                    DELIVERED
                  </th>
                  <th className="font-semibold text-sm uppercase px-6 py-6 text-center">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map(
                  ({
                    _id,
                    user,
                    createdAt,
                    totalPrice,
                    isPaid,
                    paidAt,
                    isDelivered,
                    deliveredAt,
                  }) => (
                    <tr key={_id}>
                      <td className="px-6 py-4 text-center">{_id}</td>
                      <td className="px-6 py-4 text-center">
                        {user && user.name}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {createdAt.substring(0, 10)}
                      </td>
                      <td className="px-6 py-4 text-center">{totalPrice} /-</td>
                      <td className="px-6 py-4 text-center">
                        {isPaid ? paidAt.substring(0, 10) : <p>Pending</p>}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {isDelivered ? (
                          deliveredAt.substring(0, 10)
                        ) : (
                          <p>Pending</p>
                        )}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <Link className="px-1" to={`/order/${_id}`}>
                          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-2 rounded">
                            <span className="inline-block px-1">
                              <BiEdit />
                            </span>
                          </button>
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
    </>
  );
};
