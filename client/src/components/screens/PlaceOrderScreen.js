import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { CheckoutStages } from "../CheckoutStages";

export const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const {cartItems} = cart
  let { address, city, postCode, country } = cart.shippingAddress;

  //fn
  const placerderButton = ()=>{
    //placeorder
  }
  return (
    <div className="flex flex-row justify-center ">
      <div className="flex flex-col mt-4 ">
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
          <div className="flex flex-row divide-x divide-black">
            <span className="flex w-3/5 mr-2">
              {cart.cartItems.length === 0 ? (
                <span> Cart is empty</span>
              ) : (
                <ul>
                  {cart.cartItems.map((item, index) => (
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
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div>
                  <label className="font-medium inline-block mb-3 text-sm uppercase">
                    Shipping
                  </label>
                  <select className="block p-2 text-gray-600 w-full text-sm">
                    <option>Standard shipping - $10.00</option>
                  </select>
                </div>

                <div className="border-t mt-8">
                  <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                    <span>Total cost</span>
                    <span className="font-semibold text-sm">
                      $
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                  {cartItems.length > 0 && (
                    <button
                      onClick={placerderButton}
                      className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                    >
                      Checkout
                    </button>
                  )}
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
