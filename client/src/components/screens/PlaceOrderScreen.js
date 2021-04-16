import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { CheckoutStages } from "../CheckoutStages";

export const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  let { address, city, postCode, country } = cart.shippingAddress;
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
          {cart.cartItems.length === 0 ? (
            <span> Cart is empty</span>
          ) : (
            <ul>
              {cart.cartItems.map((item, index) => (
                <li key={index}>
                  <div className="flex flex-row ">
                    <div className=" flex flex-col w-1/3 h-32 mr-auto">
                      <img
                        className="h-3/5 w-1/5 object-cover max-w-lg mx-auto rounded-lg"
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
                      {item.qty} x ${item.price} ={item.qty * item.price}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
