import React, { useState, useEffect } from "react";
import Rating from "../Rating";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import ErrorMessage from "../ErrorMessage";
export const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);
  return (
    <>
      {loading ? (
        <ClipLoader css={override} size={250} />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <div className="bg-gray-50 flex flex-row flex-wrap justify-center items-center mt-4">
          {products &&
            products.map(
              ({ _id, name, image, description, rating, category, alt }) => {
                return (
                  <div className="flex flex-col bg-white antialiased text-gray-900 p-4">
                    <div>
                      <img
                        src={image}
                        alt=" random imgee"
                        className="w-80 h-80 object-cover object-center rounded-lg shadow-md "
                      />

                      <div className="relative px-4 -mt-16">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                          <div className="flex items-baseline">
                            <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                              New
                            </span>
                            <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                              2 baths &bull; 3 rooms
                            </div>
                          </div>

                          <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">
                            A random Title
                          </h4>

                          <div className="mt-1">
                            $1800
                            <span className="text-gray-600 text-sm"> /wk</span>
                          </div>
                          <div className="mt-4">
                            <span className="text-teal-600 text-md font-semibold">
                              4/5 ratings{" "}
                            </span>
                            <span className="text-sm text-gray-600">
                              (based on 234 ratings)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
        </div>
      )}
    </>
  );
};
