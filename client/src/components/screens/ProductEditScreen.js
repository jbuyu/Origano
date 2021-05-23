import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import { HashLoader } from "react-spinners";
import { BiArrowBack } from "react-icons/bi";
import { PropagateLoader } from "react-spinners";
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
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await Axios.post("/api/upload", formData);
      setImage(data);
      setUploading(false);
    } catch (error) {
      //er
    }
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
                      {/* <div className="flex w-30 h-30 items-center justify-center bg-grey-lighter pt-4 pb-4">
                        <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                          <svg
                            className="w-8 h-8 text-red-300"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                          </svg>
                          <span className="mt-2 text-base leading-normal text-indigo-500">
                            Select a file
                          </span>
                          <input
                            id="image-file"
                            type="file"
                            className="hidden"
                            onChange={uploadFileHandler}
                          />
                        </label>
                        {uploading && <PropagateLoader/>}
                      </div> */}
                      <div>
                        <label className="font-bold block text-sm  text-gray-700">
                          Upload
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth="2"
                                strokeLineCap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, JPEG up to 10MB
                            </p>
                          </div>
                        </div>
                      </div>
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
                        rows="20"
                        cols="3"
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
