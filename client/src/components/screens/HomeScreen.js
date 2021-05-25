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
        <div className="px-2">
          <div className="bg-gray-200 rounded-full">
            {products &&
              products.map(
                ({ _id, name, image, description, rating, category, alt }) => {
                  return (
                    // <tr
                    //   key={_id}
                    //   className="bg-white border-gray-200 rounded-md"
                    // >
                    //   <td className="px-16 py-12 flex flex-row items-center justify-center">
                    //     <img
                    //       className="md:h-50 md:w-50 h-14 w-14 rounded-2xl object-cover"
                    //       src={image}
                    //       alt={alt}
                    //     />
                    //   </td>
                    //   <td>
                    //     <span className="items-center ml-2 font-semibold">
                    //       {name}
                    //     </span>
                    //   </td>
                    //   <td className="px-16 py-4">
                    //     <span>{description}</span>
                    //   </td>
                    //   <td className="px-16 py-4">{category}</td>
                    //   <td className="px-16 py-4">
                    //     <Rating value={rating} />
                    //   </td>
                    //   <td className="px-16 py-4">
                    //     <Link to={`/product/${_id}`}>
                    //       <button className="bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black ">
                    //         View
                    //       </button>
                    //     </Link>
                    //   </td>
                    // </tr>

                    <div class="vacation-card">
                      <img
                        class="vacation-card-image"
                        src={image}
                        alt="Beach in Cancun"
                      />
                      <div class="vacation-card-info">
                        <div>
                          <div class="vacation-card-eyebrow">Private Villa</div>
                          <div class="vacation-card-title">
                            <a href="/vacations/cancun">
                              Relaxing All-Inclusive Resort in Cancun
                            </a>
                          </div>
                          <div class="vacation-card-price">
                            $299 USD per night
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        </div>
      )}
    </>
  );
};
