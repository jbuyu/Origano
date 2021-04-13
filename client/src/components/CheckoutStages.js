import React from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export const CheckoutStages = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex flex-row">
      <nav className="px-4 ">
        {step1 ? (
          <Link to="/login" className="text-indigo-700">
            Sign-In
            <FaArrowAltCircleRight />
          </Link>
        ) : (
          <Link className="disabled:opacity-50 cursor-not-allowed">
            Sign-In
            <FaArrowAltCircleRight />
          </Link>
        )}
      </nav>
      <nav className="px-4">
        {step2 ? (
          <Link to="/shipping" className="text-indigo-700">
            Shipping
            <FaArrowAltCircleRight />
          </Link>
        ) : (
          <Link className="disabled:opacity-50 cursor-not-allowed">
            Shipping
            <FaArrowAltCircleRight />
          </Link>
        )}
      </nav>
      <nav className="px-4">
        {step3 ? (
          <Link to="/payment" className="text-indigo-700">
            Payment
            <FaArrowAltCircleRight />
          </Link>
        ) : (
          <Link className="disabled:opacity-50 cursor-not-allowed">
            Payment
            <FaArrowAltCircleRight />
          </Link>
        )}
      </nav>
      <nav className="px-4">
        {step4 ? (
          <Link to="/placeorder" className="text-indigo-700">
            Order
            <FaArrowAltCircleRight />
          </Link>
        ) : (
          <Link className="disabled:opacity-50 cursor-not-allowed">
            Order
            <FaArrowAltCircleRight />
          </Link>
        )}
      </nav>
    </div>
  );
};
