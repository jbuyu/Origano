import React from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export const CheckoutStages = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex flex-row" >
      <nav className="px-4">
        {step1 ? (
          <Link to="/login">
            Sign-In
            <FaArrowAltCircleRight />
          </Link>
        ) : (
          <Link className="disabled:opacity-50">
            Sign-In
            <FaArrowAltCircleRight />
          </Link>
        )}
      </nav>
      <nav className="px-4">
        {step1 ? (
          <Link to="/shipping">
            Shipping
            <FaArrowAltCircleRight />
          </Link>
        ) : (
          <Link className="disabled:opacity-50">
            Shipping
            <FaArrowAltCircleRight />
          </Link>
        )}
      </nav>
      <nav className="px-4">
        {step1 ? (
          <Link to="/payment">
            Payment
            <FaArrowAltCircleRight />
          </Link>
        ) : (
          <Link className="disabled:opacity-50">
            Payment
            <FaArrowAltCircleRight />
          </Link>
        )}
      </nav>
      <nav className="px-4">
        {step1 ? (
          <Link to="placeorder">
            Order
            <FaArrowAltCircleRight />
          </Link>
        ) : (
          <Link className="disabled:opacity-50">
            Order
            <FaArrowAltCircleRight  />
          </Link>
        )}
      </nav>
    </div>
  );
};
