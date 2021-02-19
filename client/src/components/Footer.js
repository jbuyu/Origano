import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer bg-white relative pt-1 border-blue-700 ">
      <div className="container mx-auto px-6 py-4">
        <div className="sm:flex sm:mt-8">
          <div className="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-between">
            <div className="flex flex-col">
              <span className="font-bold text-gray-700 uppercase mb-2">
                Pricing
              </span>
              <span className="my-2">
                <Link
                  to="/pricing"
                  className="text-indigo-400  text-md hover:border-indigo-800"
                >
                  Pricing
                </Link>
              </span>
              {/* <span className="my-2">
                <a
                  to="#"
                  className="text-indigo-400  text-md hover:border-indigo-800"
                >
                  link 1
                </a>
              </span>
              <span className="my-2">
                <a
                  to="#"
                  className="text-indigo-400  text-md hover:border-indigo-800"
                >
                  link 1
                </a>
              </span> */}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-700 uppercase mt-4 md:mt-0 mb-2">
                Docs
              </span>
              <span className="my-2">
                <Link
                  to="/docs"
                  className="text-indigo-400 text-md hover:border-indigo-800"
                >
                  Docs
                </Link>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-700 uppercase mt-4 md:mt-0 mb-2">
                Support
              </span>
              <span className="my-2">
                <Link
                  to="/support"
                  className="text-indigo-400  text-md hover:border-indigo-800"
                >
                  Support
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
