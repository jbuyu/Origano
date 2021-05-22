import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { listProducts, deleteProduct } from "../../actions/productActions";

import { HashLoader } from "react-spinners";

import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { FaUserEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

export const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  //list
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // delete
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  //auth
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);

  const createProductHandler = (product) => {
    //del
  };
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };
  return (
    <>
      <div className="flex justify-self-end max-w-7xl">
        <button
          onClick={createProductHandler}
          className=" bg-green-500 active:bg-green-700 flex ml-auto p-2 text-white font-bold rounded-md mb-2"
        >
          Product
          <AiOutlineAppstoreAdd />
        </button>
      </div>
      {loadingDelete && (
        <div className="flex justify-center items-center mt-6">
          <HashLoader />
        </div>
      )}
      {errorDelete && (
        <span className="flex justify-center items-center text-sm bg-red-300 rounded-lg px-4 py-2 mb-4">
        {errorDelete}
      </span>
      )}
      {loading ? (
        <div className="flex justify-center items-center mt-6">
          <HashLoader />
        </div>
      ) : error ? (
        <span className="flex justify-center items-center text-sm bg-red-300 rounded-lg px-4 py-2 mb-4">
          {error}
        </span>
      ) : (
        <div className="flex flex-grow items-center px-4">
          <div className=" w-full">
            <table className="mx-auto max-w-5xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
              <thead className="bg-gray-50">
                <tr className="text-gray-600 text-left">
                  <th className="font-semibold text-sm uppercase px-6 py-4">
                    Images
                  </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4">
                    NAME
                  </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4">
                    PRICE
                  </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                    CATEGORY
                  </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                    BRAND
                  </th>
                  <th className="font-semibold text-sm uppercase px-6 py-6 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map(
                  ({
                    _id,
                    name,
                    price,
                    category,
                    brand,
                    image,
                    countInStock,
                  }) => (
                    <tr key={_id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="inline-flex w-10 h-10">
                            <img
                              className="w-10 h-10 object-cover rounded-full"
                              alt="User avatar"
                              src={image}
                            />
                          </div>
                          <div>
                            <p className="">Jane Doe</p>
                            <p className="text-gray-500 text-sm font-semibold tracking-wide">
                              <span className="text-gray-500"> count:</span>{" "}
                              {countInStock}
                            </p>
                          </div>
                        </div>
                      </td>
                      {/* <td className="px-6 py-4">
                      <p className="">{_id}</p>
                    </td> */}
                      <td className="px-6 py-4 text-center">{name}</td>
                      <td className="px-6 py-4 text-center">{price}</td>
                      <td className="px-6 py-4 text-center">{category}</td>
                      <td className="px-6 py-4 text-center">{brand}</td>

                      <td className="px-6 py-4 text-center">
                        <Link
                          className="px-1"
                          to={`/admin/product/${_id}/edit`}
                        >
                          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-2 rounded">
                            <span className="inline-block px-1">Edit </span>
                            <span className="inline-block px-1">
                              <FaUserEdit />
                            </span>
                          </button>
                        </Link>
                        <button
                          onClick={() => {
                            deleteHandler(_id);
                          }}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-2 rounded"
                        >
                          <span className="inline-block px-1">Delete</span>
                          <span className="inline-block px-1">
                            <AiFillDelete />
                          </span>
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
