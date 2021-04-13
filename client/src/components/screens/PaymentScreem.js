import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../actions/cartActions";
import { CheckoutStages } from "../CheckoutStages";

export const PaymentScreen = ({ history }) => {
  //redux
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { shippingAddress } = cart;

  //state
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  if (!shippingAddress) {
    history.push("/shipping");
  }

  const dispatch = useDispatch();

  //fns
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod());
    history.push("/payment");
    //do sthn
  };

  return (
    <div className="flex flex-row justify-center align-middle">
      <div id="summary" className=" w-1/3 px-8 py-10 ">
        <div className="flex flex-row w-full justify-center">
          <CheckoutStages step1 step2 step3 />
        </div>
        <div className="flex flex-row justify-center align-middle">
          <h1 className="mt-4 font-semibold text-2xl border-b pb-6">Payment</h1>
        </div>
        <form onSubmit={submitHandler}>
          <div class="mt-4 flex flex-col">
            <span class="text-gray-700">Account Type</span>
            <div class="mt-2">
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  class="form-radio"
                //   name="accountType"
                  value="paypal"
                  onChange={(e)=>{
                      setPaymentMethod(e.target.value)
                  }}
                />
                <span class="ml-2">Paypal</span>
              </label>
              <label class="inline-flex items-center ml-6">
                <input
                  type="radio"
                  class="form-radio"
                //   name="accountType"
                  value="mpesa"
                  onChange={(e)=>{
                    setPaymentMethod(e.target.value)
                }}
                />
                <span class="ml-2">Mpesa</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-2 text-sm text-white uppercase w-1/3 rounded-lg"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};
