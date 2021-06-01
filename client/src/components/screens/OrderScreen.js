import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { css } from "@emotion/react";
import { SyncLoader } from "react-spinners";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ClipLoader from "react-spinners/ClipLoader";

import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../../actions/orderActions";

import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../../constants/orderConstants";

export const OrderScreen = ({ match, history }) => {
  const [sdkReady, setSdkReady] = useState(false);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  let { address, city, postCode, country } = cart.shippingAddress;

  //fn

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  // paypal
  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay, loading: loadingPay } = orderPay;
  // let { address, city, postCode, country } = order.shippingAddress;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver, loading: loadingDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    const BASE_URL = "http://localhost:4000";
    const addPayPalScript = async () => {
      const { data: clientId } = await Axios.get(
        `${BASE_URL}/api/config/paypal`
      );
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || successDeliver) {
      dispatch({
        type: ORDER_PAY_RESET,
      });
      dispatch({
        type: ORDER_DELIVER_RESET,
      });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  //calculations
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  cart.itemPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
  );
  cart.shippingPrice = addDecimals(cart.itemPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemPrice).toFixed(2)));

  cart.totalPrice = (
    Number(cart.itemPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  return loading ? (
    <ClipLoader css={override} size={250} />
  ) : error ? (
    <span className="bg-red-300 rounded-md p-2">{error}</span>
  ) : (
    <div className=" justify-center p-4">
      <div className="flex flex-col mt-4 ">
        <div>
          <h2 className="mt-4 mb-4 border-b border-black text-lg text-indigo-600 ">
            Shipping
          </h2>
          <p>
            <strong>Name: </strong>
            {order.user.name}
          </p>
          <p>
            <strong>Email: </strong>
            <a className="underline" href={`mailto: ${order.user.email}`}>
              {order.user.email}
            </a>
          </p>
          <p>
            <strong className="p-2">Address :</strong>
            <span className=" text-base text-gray-500">
              {address}, {city}, {postCode}, {country}
            </span>
          </p>
          <p>
            <strong className="p-2">Delivery status :</strong>
            {order.isDelivered ? (
              <span className=" text-md bg-green-400 px-2 rounded-md">
                Delivered on
                <span className="p-2">
                  {format(new Date(order.deliveredAt), "yyyy-MM-dd")}
                </span>
              </span>
            ) : (
              <span className=" text-md bg-red-400 px-2 rounded-md">
                Not Delivered
              </span>
            )}
          </p>
        </div>
        <div>
          <h2 className="mt-4 mb-4 border-b border-black text-lg text-indigo-600 ">
            Payment Method
          </h2>
          <p>
            <strong className="p-2">Method :</strong>
            <span className=" text-base text-gray-500">
              {order.paymentMethod}
            </span>
          </p>
          <p>
            <strong className="p-2">Payment status :</strong>
            {order.isPaid ? (
              <span className=" text-md bg-green-400 px-2 rounded-md">
                <span className="p-2">Paid on</span>

                {format(new Date(order.paidAt), "yyyy-MM-dd")}
              </span>
            ) : (
              <span className=" text-md bg-red-400 px-2 rounded-md">
                Not Paid
              </span>
            )}
          </p>
        </div>
        <div>
          <h2 className="mt-4 mb-4 border-b border-black text-lg text-indigo-600 ">
            Order Items
          </h2>
          <div className="flex flex-col md:flex-row divide-x divide-black">
          <span className="flex w-1/2 mr-2">

            <table className="divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Details
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th scope="col" className="relative px-4 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.orderItems.length === 0 ? (
                  <span>Cart is Empty</span>
                ) : (
                  order.orderItems.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                            loading="lazy"
                              className="h-10 w-10 rounded-full"
                              src={item.image}
                              alt={item.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.quantity}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <Link
                            to={`/product/${item.product}`}
                            className="hover:text-indigo-600"
                          >
                            {item.name}
                          </Link>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {item.qty} x {item.price}/- = Ksh.
                          {item.qty * item.price}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            </span>
            <span className="w-screen md:w-2/5">
              <div id="summary" className="w-3/4 px-8 py-10 ml-1 ">
                <h1 className="font-semibold text-2xl border-b pb-8">
                  Order Summary
                </h1>
                <div className="flex justify-between mt-10 mb-5">
                  <span className="font-semibold text-sm uppercase">
                    Items {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </span>
                  <span className="font-semibold text-sm">
                    {cart.itemPrice}
                  </span>
                </div>
                <div className="flex justify-between mt-10 mb-5">
                  <span className="font-semibold text-sm uppercase">
                    Shipping
                  </span>
                  <span className="font-semibold text-sm">
                    {cart.shippingPrice} /-
                  </span>
                </div>

                <div className="flex justify-between mt-10 mb-5">
                  <span className="font-semibold text-sm uppercase">Tax</span>
                  <span className="font-semibold text-sm">
                    {cart.taxPrice} /-
                  </span>
                </div>

                <div className="border-t mt-8">
                  <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                    <span>Total cost</span>
                    <span className="font-semibold text-sm">
                      {cart.totalPrice}
                      /-
                    </span>
                  </div>
                  <div className="flex justify center m-2 ">
                    {error && (
                      <span className="bg-red-300 rounded-md p-2">{error}</span>
                    )}
                  </div>
                  <div className="flex justify-center">
                    {!order.isPaid && (
                      <span>
                        {loadingPay && <SyncLoader />}
                        {!sdkReady ? (
                          <SyncLoader />
                        ) : (
                          <PayPalButton
                            amount={order.totalPrice}
                            onSuccess={successPaymentHandler}
                          />
                        )}
                      </span>
                    )}
                    {/* delivering order */}
                    {loadingDeliver && <SyncLoader />}
                    {userInfo &&
                      userInfo.isAdmin &&
                      order.isPaid &&
                      !order.isDelivered && (
                        <button
                          onClick={deliverHandler}
                          className=" bg-green-500 active:bg-green-700 flex ml-auto py-2 px-4 text-white font-bold rounded-md mb-2"
                        >
                          mark as Delivered
                        </button>
                      )}
                  </div>
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
