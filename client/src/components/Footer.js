import React from "react";
import { Link } from "react-router-dom";
import MpesaSvg from "../icons/mpesa.svg";
import PaypalSvg from "../icons/paypal.svg";

const Footer = () => {
  return (
    <footer className="footer relative pt-1 border-blue-700 bg-gray-100">
      <div className="container mx-auto px-6 py-4 w-full">
        <div className="sm:flex sm:mt-8">
          <div className="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-between align-middle items-center ">
            <div className="flex flex-col mb-4">
              <span className="font-bold text-gray-700 uppercase ">
                Payment
              </span>
              <span className=" flex flex-col items-center">
                <span className="ml-2">
                  <img className="h-12 w-12 p-1" src={MpesaSvg} alt="logo" />
                </span>
                <span className="ml-2">
                  <img className="h-12 w-12 p-1" src={PaypalSvg} alt="logo" />
                </span>
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="font-bold text-gray-700 uppercase mb-2">
                Pricing
              </span>
              <span className="my-2">
                <Link
                  to="/pricing"
                  className="text-indigo-400  text-md hover:border-indigo-800"
                >
                  Brochure
                </Link>
              </span>
              
            </div>

            <div className="flex flex-col items-center">
              <span className="font-bold text-gray-700 uppercase ">
                Support
              </span>
              <span className="my-2">
                <Link
                  to="/support"
                  className="text-indigo-400  text-md hover:border-indigo-800"
                >
                  Tech Support
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
