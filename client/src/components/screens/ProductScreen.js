import React, { useEffect, useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import Rating from "../Rating";
import ClipLoader from "react-spinners/ClipLoader";
import SyncLoader from "react-spinners/SyncLoader";
import { css } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../ErrorMessage";
import "./Product.css";
import Select from "react-select";

import {
  listProductDetails,
  createProductReview,
} from "../../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../constants/productConstants";

export const ProductScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(1);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  let { loading, error, product } = productDetails;
  let { image, name, price, countInStock, description, alt } = product;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  let { success: successProductReview, error: errorProductRevview } =
    productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  let { userInfo } = userLogin;

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  let productId = match.params.id;
  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    console.log("mam", selectedOption.value);

    let selectedValue = selectedOption.value ? selectedOption.value : 1;

    selectedOption && history.push(`/cart/${productId}?qty=${selectedValue}`);
  };
  return (
    <div className="min-h-full">
      {loading ? (
        <ClipLoader css={override} size={250} />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <main className="my-2">
          <div className="container mx-auto px-6">
            <div className="md:flex md:items-center">
              <div className="flex flex-col md:flex-row">
                <div className="w-full h-64 md:w-1/2 lg:h-96">
                  {image ? (
                    <img
                      className="h-4/5 w-full rounded-3xl object-cover max-w-sm mx-auto"
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
                  <span className="text-gray-500 mt-3">{`Ksh. ${price}`}</span>
                  <hr className="py-3" />
                  <div className="w-3/4">{description}</div>
                  <div className="mt-2">
                    <label className="text-gray-700 text-sm" htmlFor="count">
                      STOCK
                    </label>
                    <div className="flex items-center mt-1">
                      <span className="text-gray-700 text-base mx-2">
                        {countInStock > 0 ? countInStock : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-4">
                  <div className="mt-2">
                    <label className="text-gray-700 text-sm" htmlFor="count">
                      Quantity
                    </label>
                    <br />
                    {/* {countInStock && (
                      <Dropdown
                        options={[...Array(countInStock).keys()]}
                        onOptionSelect={(option) => {
                          console.log("Selected Option", option);
                        }}
                      />
                    )} */}
                    {countInStock && (
                      <Select
                        className="w-2/3 mt-2"
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={[...Array(countInStock).keys()].map(
                          (count) => ({
                            label: count + 1,
                            value: count + 1,
                          })
                        )}
                      />
                    )}
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
                  {countInStock > 0 ? (
                    <div className="flex items-center mt-6">
                      <button
                        onClick={addToCartHandler}
                        className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
                      >
                        Order
                      </button>
                      <button className="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
                        <FaCartArrowDown />
                      </button>
                    </div>
                  ) : (
                    <button className="mt-6 cursor-not-allowed px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                      Order
                    </button>
                  )}
                  <div className="flex mx-auto items-center justify-center shadow-lg mt-4  mb-4 max-w-lg">
                    <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
                          Add a new comment
                        </h2>
                        <div className="w-full md:w-full px-3 mb-2 mt-2">
                          <textarea
                            className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                            name="body"
                            placeholder="Type Your Comment"
                            required
                          ></textarea>
                        </div>
                        <div className="w-full md:w-full flex items-start  px-3">
                          <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                            <svg
                              fill="none"
                              className="w-5 h-5 text-gray-600 mr-1"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <p className="text-xs md:text-sm pt-px">
                              Some HTML is okay.
                            </p>
                          </div>
                          <div className="-mr-1">
                            <input
                              type="submit"
                              className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                              value="Post Comment"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </main>
      )}
    </div>
  );
};
