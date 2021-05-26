import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { listTopProducts } from "../actions/productActions";

export const ProductCarousel = () => {
  const dispatch = useDispatch();
  const productToprated = useSelector((state) => state.productToprated);
  const { loading, error, products } = productToprated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-center items-center ">
      {loading ? (
        <HashLoader />
      ) : error ? (
        <span className="p-2 bg-red-300">{error}</span>
      ) : (
        <div>main</div>
      )}
    </div>
  );
};
