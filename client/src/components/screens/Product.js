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
import Select from "react-select";

export const Product = ({ match, history }) => {
  const [selectedOption, setSelectedOption] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  let { loading, error, product } = productDetails;
  let { image, name, price, countInStock, rating, description, alt } = product;
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
        <main className="my-8">
          <div className="container mx-auto px-6">
            <div className="md:flex md:items-center">
              <div className="flex flex-row">
                <div>
                  <div className="w-full h-64 md:w-1/2 lg:h-96">
                    {image ? (
                      <img
                        className="h-4/5 w-full rounded-3xl object-cover max-w-lg mx-auto"
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
                        {countInStock > 0 ? countInStock : "Out of Stock"}
                      </span>
                    </div>
                  </div>
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
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};
