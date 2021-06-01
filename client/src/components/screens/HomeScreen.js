import React, { useState, useEffect } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Rating from "../Rating";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import ErrorMessage from "../ErrorMessage";
import { Paginate } from "../Paginate";
import { ProductCarousel } from "../ProductCarousel";
import { Meta } from "../Meta";
export const HomeScreen = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const keyword = match.params.keyword;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
    // console.log("process", process.env.NODE_ENV);
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
      <Meta />
      {/* {
      !keyword && <ProductCarousel/>
    } */}
      <div className="flex flex-col justify-center items-center">
        {loading ? (
          <div className="h-screen" >

            <ClipLoader  css={override} size={250} />
          </div>
        ) : error ? (
          <div className="h-screen">

            <ErrorMessage>{error}</ErrorMessage>
          </div>
        ) : (
          <>
            <div className="bg-gray-50 flex flex-row flex-wrap justify-center items-center mt-4 h-full">
              {products &&
                products.map(
                  ({
                    _id,
                    name,
                    image,
                    numReviews,
                    rating,
                    category,
                    alt,
                    countInStock,
                    price,
                  }) => {
                    return (
                      <div
                        key={_id}
                        className="flex flex-col bg-white antialiased text-gray-900 p-4"
                      >
                        <div>
                          <LazyLoadImage
                          loading="lazy"
                            src={image}
                            alt={alt}
                            className="w-80 h-80 object-cover object-center rounded-lg shadow-md "
                          />

                          <div className="relative px-4 -mt-16">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                              <div className="flex items-baseline">
                                <span className="bg-green-200 text-green-800 text-xs py-1 px-2 inline-block rounded-full  uppercase font-medium tracking-wide">
                                  {category}
                                </span>
                                <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                                  <span className="text-red-300 p-1">
                                    {countInStock}
                                  </span>
                                  in stock
                                </div>
                              </div>
                              <h4 className="mt-1 text-xl font-medium uppercase leading-tight truncate hover:underline hover:text-gray-400 ">
                                <Link to={`/product/${_id}`}>{name}</Link>
                              </h4>
                              <div className="mt-1">{price} /-</div>
                              <div className="mt-4">
                                <span className="text-teal-600 text-md font-semibold">
                                  <Rating value={rating} />
                                </span>
                                <span className="text-sm text-gray-600">
                                  (based on {numReviews} ratings)
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
            <div className="mt-8">
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ""}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};
