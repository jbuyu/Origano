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

const BASE_URL = 'http://localhost:4000'

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
      const { data } = await Axios.post(`${BASE_URL}/api/upload`, formData);
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
                      <div className="flex flex-col w-30 h-30 items-center justify-center bg-grey-lighter pt-4 pb-4">
                        <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
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
                        <div className="p-2">

                        {uploading && <PropagateLoader/>}
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
