import React, { useState, useEffect } from "react";
import Rating from "../Rating";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import ErrorMessage from "../ErrorMessage";
export const ProductTable = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <ClipLoader css={override} size={250} />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <div className="px-2">
          <table className="bg-white rounded-md mx-auto my-6 p-16 table-auto w-3/4">
            <thead className="justify-between">
              <tr className="bg-gray-100">
                <th className="px-16 py-2">
                  <span className="text-gray-600">Image</span>
                </th>
                <th className="px-16 py-2">
                  <span className="text-gray-600">Name</span>
                </th>
                <th className="px-16 py-2">
                  <span className="text-gray-600">Description</span>
                </th>
                <th className="px-16 py-2">
                  <span className="text-gray-600">Category</span>
                </th>
                <th className="px-16 py-2">
                  <span className="text-gray-600">Rating</span>
                </th>
                <th className="px-16 py-2">
                  <span className="text-gray-600">View</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-200 rounded-full">
              {products &&
                products.map(
                  ({
                    _id,
                    name,
                    image,
                    description,
                    rating,
                    category,
                    alt,
                  }) => {
                    return (
                      <tr
                        key={_id}
                        className="bg-white border-gray-200 rounded-md"
                      >
                        <td className="px-16 py-12 flex flex-row items-center justify-center">
                          <img
                            className="md:h-50 md:w-50 h-14 w-14 rounded-2xl object-cover"
                            src={image}
                            alt={alt}
                          />
                        </td>
                        <td>
                          <span className="items-center ml-2 font-semibold">
                            {name}
                          </span>
                        </td>
                        <td className="px-16 py-4">
                          <span>{description}</span>
                        </td>
                        <td className="px-16 py-4">{category}</td>
                        <td className="px-16 py-4">
                          <Rating value={rating} />
                        </td>
                        <td className="px-16 py-4">
                          <Link to={`/product/${_id}`}>
                            <button className="bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black ">
                              View
                            </button>
                          </Link>
                        </td>
                      </tr>
                    );
                  }
                )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
