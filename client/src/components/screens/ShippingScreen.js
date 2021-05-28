import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../actions/cartActions";
import { CheckoutStages } from "../CheckoutStages";

export const ShippingScreen = ({ history }) => {
  //redux
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { shippingAddress } = cart;

  //state
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postCode, setPostCode] = useState(shippingAddress.postCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  //fns
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postCode, country }));
    history.push("/payment");
    //do sthn
  };

  return (
    <div className="flex flex-row justify-center align-middle">
      <div id="summary" className="w-full md:w-1/3 px-8 py-10 ">
        <div className="flex flex-row w-full justify-center">
          <CheckoutStages step1 step2 />
        </div>
        <div className="flex flex-row justify-center align-middle">
          <h1 className="mt-4 font-semibold text-2xl border-b pb-6">
            Shipping
          </h1>
        </div>
        <form onSubmit={submitHandler}>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              Items {cartItems.reduce((acc, item) => acc + item.qty, 0)}
            </span>
            <span className="font-semibold text-sm">
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm">
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="Enter Address"
              className="p-2 text-sm w-full bg-gray-200"
              value={address || ""}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              required
            />
          </div>
          <div className="mt-2">
            <label className="font-medium inline-block mb-3 text-sm">
              City
            </label>
            <input
              type="text"
              id="city"
              placeholder="Enter City"
              className="p-2 text-sm w-full bg-gray-200"
              value={city || ""}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              required
            />
          </div>
          <div className="mt-2">
            <label className="font-medium inline-block mb-3 text-sm">
              Country
            </label>
            <input
              type="text"
              id="country"
              placeholder="Enter Country"
              className="p-2 text-sm w-full bg-gray-200"
              value={country || ""}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              required
            />
          </div>
          <div className="mt-2">
            <label className="font-medium inline-block mb-3 text-sm">
              Post Code
            </label>
            <input
              type="text"
              id="postCode"
              placeholder="Enter Postal Code"
              className="p-2 text-sm w-full bg-gray-200"
              value={postCode || ""}
              onChange={(e) => {
                setPostCode(e.target.value);
              }}
              required
            />
          </div>
          {/* <div className="py-10">
            <label
              htmlFor="promo"
              className="font-semibold inline-block mb-3 text-sm uppercase"
            >
              Promo Code
            </label>
            <input
              type="text"
              id="promo"
              placeholder="Enter your code"
              className="p-2 text-sm w-full bg-gray-200"
            />
          </div> */}

          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span className="font-semibold text-sm">
                ${" "}
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </span>
            </div>
            {cartItems.length > 0 && (
              <button
                type="submit"
                className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-2 text-sm text-white uppercase w-full rounded-lg"
              >
                Continue
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
