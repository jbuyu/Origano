import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ClipLoader from "react-spinners/ClipLoader";

import { getOrderDetails } from "../../actions/orderActions";

export const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;


  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  let { address, city, postCode, country } = order.shippingAddress;

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  //fn
  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, []);

  return loading ? (
    <ClipLoader css={override} size={250} />
  ) : error ? (
    <span className="bg-red-300 rounded-md p-2">{error}</span>
  ) : (
    <div className="flex flex-row justify-center m-4">
      <div className="flex flex-col mt-4 ">
        <div>
          <h2 className="mt-4 mb-4 border-b border-black text-lg text-indigo-600 ">
            Shipping
          </h2>
          <p>
            <strong className="p-2">Address :</strong>
            <span className=" text-base text-gray-500">
              {address}, {city}, {postCode}, {country}
            </span>
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
        </div>
        <div>
          <h2 className="mt-4 mb-4 border-b border-black text-lg text-indigo-600 ">
            Order Items
          </h2>
          <div className="flex flex-row divide-x divide-black">
            <span className="flex w-3/5 mr-2">
              {order.orderItems.length === 0 ? (
                <span> Cart is empty</span>
              ) : (
                <ul>
                  {order.orderItems.map((item, index) => (
                    <li key={index}>
                      <div className="flex flex-row ">
                        <div className=" flex flex-col w-1/3 h-32 mr-auto">
                          <img
                            className="h-3/5 w-1/5 object-cover mx-auto rounded-lg"
                            src={item.image}
                            alt={item.name}
                          />
                        </div>
                        <div className="flex flex-col justify-center float-left mr-auto text-md text-red-500">
                          {item.qty}
                        </div>
                        <div className=" flex flex-col justify-center align-middle items-center">
                          <Link
                            to={`/product/${item.product}`}
                            className="hover:text-indigo-600"
                          >
                            {item.name}
                          </Link>
                        </div>
                        <div className="flex flex-col justify-center float-left ml-auto ">
                          {item.qty} x {item.price}/- = Ksh.
                          {item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </span>

            <span className="w-2/5">
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
                    {cartItems.length > 0 && (
                      <button
                        // onClick={placerderButton}
                        className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-3/5 rounded-md "
                      >
                        Order
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
