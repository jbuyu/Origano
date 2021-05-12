import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../actions/cartActions";
import { CheckoutStages } from "../CheckoutStages";
import PaypalSvg from "../../icons/paypal.svg";
import MpesaSvg from "../../icons/mpesa.svg";

export const PaymentScreen = ({ history }) => {
  //redux
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { shippingAddress } = cart;

  //state
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  if (!shippingAddress) {
    history.push("/shipping");
  }

  const dispatch = useDispatch();

  //fns
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    if(paymentMethod){
      history.push("/placeorder");
    }
    //do sthn
  };

  return (
    <div className="flex flex-row justify-center align-middle">
      <div id="summary" className=" w-1/3 px-8 py-10 ">
        <div className="flex flex-row w-full justify-center">
          <CheckoutStages step1 step2 step3 />
        </div>
        <div className="flex flex-row justify-center align-middle">
          <div className="flex flex-col">
            <h1 className="mt-4 font-semibold text-2xl border-b pb-6">
              Payment
            </h1>
            <form  onSubmit={submitHandler}>
              <div className="mt-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio cursor-pointer"
                    name="paymentmethod"
                    id="paypal"
                    value="paypal"
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                    }}
                  />
                  <span className="ml-2">
                    <img className="h-9 w-9" src={PaypalSvg} alt="logo" />
                  </span>
                </label>
                <label className="inline-flex items-center md:ml-6">
                  <input
                    type="radio"
                    className="form-radio cursor-pointer"
                    name="paymentmethod"
                    id="mpesa"
                    value="mPesa"
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                    }}
                  />
                  <span className="ml-2">
                    <img className="h-16 w-16 p-1" src={MpesaSvg} alt="logo" />
                  </span>
                </label>
              </div>
              <div className="flex flex-row justify-center align-middle">
                <button
                  type="submit"
                  className="bg-indigo-500 font-semibold hover:bg-indigo-600 p-2 text-sm text-white uppercase mt-4  rounded-lg"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
