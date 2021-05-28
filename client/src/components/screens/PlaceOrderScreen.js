import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { CheckoutStages } from "../CheckoutStages";
import { createOrder } from "../../actions/orderActions";

export const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  let { address, city, postCode, country } = cart.shippingAddress;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;
  //fn
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [history, success]);
  const placerderButton = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemPrice: cart.itemPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
    console.log("created order");
  };

  //price calcs
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
  console.log(cart.taxPrice);
  return (
      <div className="flex flex-col mt-4 p-4">
        <CheckoutStages step1 step2 step3 step4 />
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
              {cart.paymentMethod}
            </span>
          </p>
        </div>
        <div>
          <h2 className="mt-4 mb-4 border-b border-black text-lg text-indigo-600 ">
            Order Items
          </h2>
          <div className="flex flex-col md:flex-row md:divide-x md:divide-black">
            {/* <span className="flex w-3/5 mr-2">
              {cart.cartItems.length === 0 ? (
                <span> Cart is empty</span>
              ) : (
                <ul>
                  {cart.cartItems.map((item, index) => (
                    <li key={index}>
                      <div className="w-1/2 md:w-full flex flex-row">
                        <div className=" flex flex-col w-full md:w-1/3 h-24 mr-auto">
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
            </span> */}
            <table class="divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th scope="col" class="relative px-4 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                  <td class="px-4 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img
                          class="h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                          alt=""
                        />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          Jane Cooper
                        </div>
                        
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      Regional
                    </div>
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    Admin
                  </td>
                </tr>
              </tbody>
            </table>
            <span className="w-full">
              <div id="summary" className="w-full px-8 py-10 ml-1 ">
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
                  <div className="flex justify-center m-2 ">
                    {error && (
                      <span className="bg-red-300 rounded-md p-2">{error}</span>
                    )}
                  </div>
                  <div className="flex justify-center">
                    {cartItems.length > 0 && (
                      <button
                        onClick={placerderButton}
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
  );
};
