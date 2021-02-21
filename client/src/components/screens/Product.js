import React, { useEffect, useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import Rating from "../Rating";
import ClipLoader from "react-spinners/ClipLoader";
import SyncLoader from "react-spinners/SyncLoader";
import { css } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../actions/productActions";
import ErrorMessage from "../ErrorMessage";
import "./Product.css";
import { ItemQuantity } from "./ItemQuantity";
export const Product = ({ match }) => {
  const [qty, useQty] = useState(0);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  let { loading, error, product } = productDetails;
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  let productId = match.params.id;
  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [dispatch, match]);

  let { image, name, price, countInStock, rating, description, alt } = product;

  const setCount = (count) => {
    // useQty(count);
    console.log(count);
  };
  const makeCount = () => {
    console.log("hey");
  };
  return (
    <div>
      {loading ? (
        <ClipLoader css={override} size={250} />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <main className="my-8">
          <div className="container mx-auto px-6">
            <div className="md:flex md:items-center">
              <div className="flex flex-row">
                <div>
                  <div className="w-full h-64 md:w-1/2 lg:h-96">
                    {image ? (
                      <img
                        className="h-4/5 w-full rounded-lg object-cover max-w-lg mx-auto"
                        src={image}
                        alt={alt}
                      />
                    ) : (
                      <SyncLoader size={15} />
                    )}
                  </div>
                  <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
                    <h3 className="text-gray-700 uppercase text-lg mt-2">
                      {name}
                    </h3>
                    {/* <div className="mt-2">
                      <label className="text-gray-700 text-sm" htmlFor="count">
                        RATING
                      </label>
                      <div className="flex items-center mt-1">
                        <span className="text-gray-700 text-base mx-2">
                          <Rating value={rating} />
                        </span>
                      </div>
                    </div> */}
                    <span className="text-gray-500 mt-3">{`Ksh. ${price}`}</span>
                    <hr className="my-3" />
                    <div>{description}</div>
                  </div>
                </div>
                <div className="px-2">
                  <div className="mt-2">
                    <label className="text-gray-700 text-sm" htmlFor="count">
                      STOCK
                    </label>
                    <div className="flex items-center mt-1">
                      <span className="text-gray-700 text-base mx-2">
                        {countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="text-gray-700 text-sm" htmlFor="count">
                      Price
                    </label>
                    <div className="flex items-center mt-1">
                      <span className="text-gray-700 text-base mx-2">
                        {price}
                      </span>
                    </div>
                  </div>

                  <div className="relative inline-flex">
                    <svg
                      className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 412 232"
                    >
                      <path
                        d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                        fill="#648299"
                        fillRule="nonzero"
                      />
                    </svg>
                    <select
                      onChange={(e) => setCount(e.target.value)}
                      className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none mt-3"
                    >
                      {[...Array(countInStock).keys()].map((count, index) => (
                        <option
                          className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap mx-2 cursor-pointer "
                          key={index}
                          value={count}
                        >
                          {count}
                        </option>
                      ))}
                    </select>
                  </div>
                  {countInStock > 0 ? (
                    <div className="flex items-center mt-6">
                      <button className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                        Order
                      </button>
                      <button className="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
                        <FaCartArrowDown />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={makeCount}
                      className="mt-6 cursor-not-allowed px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
                    >
                      Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};
