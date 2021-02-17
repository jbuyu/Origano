import React from "react";
import products from "../../products";
import { FaCartArrowDown } from "react-icons/fa";
export const Product = ({ match }) => {
  const product = products.find((p) => p._id === parseInt(match.params.id));
  let { image, name, price, countInStock } = product;

  return (
    <main className="my-8">
      <div className="container mx-auto px-6">
        <div className="md:flex md:items-center">
          <div className="w-full h-64 md:w-1/2 lg:h-96">
            <img
              className="h-full w-full rounded-md object-cover max-w-lg mx-auto"
              src={image}
              alt="Nike Air"
            />
          </div>
          <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
            <h3 className="text-gray-700 uppercase text-lg">{name}</h3>
            <span className="text-gray-500 mt-3">{`Ksh. ${price}`}</span>
            <hr className="my-3" />
            <div className="mt-2">
              <label className="text-gray-700 text-sm" htmlFor="count">
                STOCK
              </label>
              <div className="flex items-center mt-1">
                <span className="text-gray-700 text-lg mx-2">
                  {countInStock}
                </span>
              </div>
            </div>

            <div className="flex items-center mt-6">
              <button className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                Order Now
              </button>
              <button className="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
                <FaCartArrowDown />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
