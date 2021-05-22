import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import { HashLoader } from "react-spinners";
import { BiArrowBack } from "react-icons/bi";
import {
  listProductDetails,
  updateProduct,
} from "../../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../../constants/productConstants";

export const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [color, setColor] = useState("#FCA5A5");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );

    //update prod
  };
  return (
    <>
      <div>
        <span className="inline-block">
          <BiArrowBack />
        </span>
        <span className="inline-block">
          <Link
            className="underline text-indigo-600 font-bold p-2"
            to="/admin/productList"
          >
            Go Back
          </Link>
        </span>
      </div>
      <div className="lg:flex flex flex-row justify-center items-center">
        <div className="lg:w-1/2 xl:max-w-screen-sm">
          <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
            <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">
              <span className="flex flex-row justify-between items-center">
                Edit Product
              </span>
            </h2>
            <div className="flex flex-col justify-center items-center">
              {loadingUpdate && <HashLoader />}
              {errorUpdate && <ErrorMessage>{error}</ErrorMessage>}
            </div>
            <div className="mt-12">
              <div className="flex flex-row justify-center items-center">
                {loading ? (
                  <HashLoader color={color}></HashLoader>
                ) : error ? (
                  <ErrorMessage>{error}</ErrorMessage>
                ) : (
                  <form onSubmit={submitHandler}>
                    <div className="mt-8">
                      <div className="flex justify-between items-center">
                        <div className="text-sm font-bold text-gray-700 tracking-wide">
                          Name
                        </div>
                      </div>
                      <input
                        className="w-full text-lg py-2 px-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 rounded-sm text-gray-400"
                        type="text"
                        placeholder="Enter names"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-700 tracking-wide">
                        Price (/-)
                      </div>
                      <input
                        className="w-full text-lg py-2 px-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 rounded-sm text-gray-400"
                        type="number"
                        placeholder="Enter Price"
                        value={price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-700 tracking-wide">
                        Image
                      </div>
                      <input
                        className="w-full text-lg py-2 px-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 rounded-sm text-gray-400"
                        type="text"
                        placeholder="Image"
                        value={image}
                        onChange={(e) => {
                          setImage(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-700 tracking-wide">
                        Brand
                      </div>
                      <input
                        className="w-full text-lg py-2 px-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 rounded-sm text-gray-400"
                        type="brand"
                        placeholder="brand"
                        value={brand}
                        onChange={(e) => {
                          setBrand(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-700 tracking-wide">
                        Count In Stock
                      </div>
                      <input
                        className="w-full text-lg py-2 px-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 rounded-sm text-gray-400"
                        type="number"
                        placeholder="Enter Count"
                        value={countInStock}
                        onChange={(e) => {
                          setCountInStock(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-700 tracking-wide">
                        Category
                      </div>
                      <input
                        className="w-full text-lg py-2 px-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 rounded-sm text-gray-400"
                        type="text"
                        placeholder="category"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-700 tracking-wide">
                        Description
                      </div>
                      <input
                        className="w-full text-lg py-2 px-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 rounded-sm text-gray-400"
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mt-2 flex flex-row justify-center items-center ">
                      {error && (
                        <span className="text-sm bg-red-300 rounded-lg px-6 py-1">
                          {error}
                        </span>
                      )}
                    </div>

                    <div className="mt-10">
                      <button className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg">
                        Update
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
