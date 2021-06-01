import React, { useEffect, useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import Rating from "../Rating";
import ClipLoader from "react-spinners/ClipLoader";
import SyncLoader from "react-spinners/SyncLoader";
import { css } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../ErrorMessage";
import { Link } from "react-router-dom";
import "./Product.css";
import Select from "react-select";
import { format } from "date-fns";

import {
  listProductDetails,
  createProductReview,
} from "../../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../constants/productConstants";
import { Meta } from "../Meta";

export const ProductScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(1);

  const [ratingObject, setRatingObject] = useState(1);
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
    if (successProductReview) {
      alert("Review Submitted");
      setRatingObject(0);
      setComment("");
      dispatch({
        type: PRODUCT_CREATE_REVIEW_RESET,
      });
    }
    dispatch(listProductDetails(productId));
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    let selectedValue = selectedOption.value ? selectedOption.value : 1;

    selectedOption && history.push(`/cart/${productId}?qty=${selectedValue}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    let rating = ratingObject.value;
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };
  return (
    <div className="min-h-full">
      {loading ? (
        <ClipLoader css={override} size={250} />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <>
        <Meta title={product.name} />
        <main className="my-2 h-screen">
          <div className="container mx-auto px-6">
            <div className="md:flex md:items-center">
              <div className="flex flex-col md:flex-row">
                <div className="w-full h-64 md:w-1/2 lg:h-96">
                  {image ? (
                    <img
                    loading="lazy"
                      className="h-4/5 w-full rounded-3xl object-cover max-w-sm mx-auto"
                      src={image}
                      alt={alt}
                    />
                  ) : (
                    <SyncLoader size={15} />
                  )}
                </div>
                <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
                  <h3 className="text-gray-700 uppercase text-sm mt-2">
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
                  <div className="mt-2">
                    <div className="flex items-center mt-1">
                      <span className="text-gray-700 text-base mx-2">
                        {product.rating && (<Rating value={product.rating} />)}
                      </span>
                      <span>
                        {product.numReviews && (
                          <div> {product.numReviews} reviews </div>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="text-gray-700 text-sm" htmlFor="count">
                      Quantity
                    </label>
                    <br />
                    {countInStock && (
                      <Select
                        className="w-1/3 mt-2"
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
                <div className="sm:px-4 pt-2">
                  {errorProductRevview && (
                    <span className="p-2 bg-red-300">
                      {errorProductRevview}
                    </span>
                  )}
                  {userInfo ? (
                    <div className="flex mx-auto items-center justify-center shadow-lg mt-2 mb-4 max-w-lg">
                      <form
                        onSubmit={submitHandler}
                        className="w-full max-w-xl bg-white rounded-lg px-4 pt-2"
                      >
                        <div className="mt-2">
                          <label
                            className="text-gray-700 text-sm"
                            htmlFor="count"
                          >
                            Add Rating
                          </label>
                          <br />
                          <Select
                            className="w-1/3 mt-2"
                            placeholder="rating"
                            defaultValue={ratingObject}
                            required
                            onChange={setRatingObject}
                            options={[...Array(5).keys()].map((count) => ({
                              label: count + 1,
                              value: count + 1,
                            }))}
                          />
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                          <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
                            Add a Review
                          </h2>
                          <div className="w-full md:w-full px-3 mb-2 mt-2">
                            <textarea
                              className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-500 focus:outline-none focus:bg-white"
                              name="body"
                              placeholder="Review"
                              onChange={(e) => {
                                setComment(e.target.value);
                              }}
                              required
                            ></textarea>
                          </div>
                          <div className="w-full md:w-full flex items-start  px-3">
                            <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto"></div>
                            <div className="-mr-1">
                              <button
                                type="submit"
                                className="bg-indigo-500 text-white font-medium py-2 px-6 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100 cursor-pointer"
                              >
                                <FiSend />
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <span className="mt-8">
                      please
                      <Link className="bg-red-300 px-2 rounded" to="/login">
                        Sign in
                      </Link>
                      to leave a review
                    </span>
                  )}
                  {product.reviews && (
                    <div className="mt-2">
                      <label className="text-gray-700 text-sm" htmlFor="count">
                        REVIEWS
                      </label>
                      <div className="flex mt-1">
                        <span className="text-gray-700 text-base">
                          {product.reviews.length === 0 ? (
                            <span className="bg-red-200 px-2 rounded">
                              No reviews
                            </span>
                          ) : (
                            <div>
                              {product.reviews.map((review) => (
                                <div key={review._id}>
                                  <p className="font-medium">{review.name}</p>
                                  <div className="pt-2">
                                    <Rating value={review.rating} />
                                  </div>
                                  <p className="pt-2">
                                    {format(
                                      new Date(review.createdAt),
                                      "yyyy-MM-dd"
                                    )}
                                  </p>
                                  <p className="text-indigo-400">
                                    {review.comment}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
        </>
      )}
    </div>
  );
};
