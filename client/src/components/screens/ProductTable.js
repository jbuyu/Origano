import React from "react";
import products from "../../products";
import Rating from "../Rating";
import { Link } from "react-router-dom";
export const ProductTable = () => {
  return (
    <div className="px-2">
      <table className="bg-white rounded-lg mx-auto my-6 p-16 table-auto">
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
        <tbody className="bg-gray-200">
          {products.map(
            ({ _id, name, image, description, rating, category, alt }) => {
              return (
                <tr
                  key={_id}
                  className="bg-white border-4 border-gray-200 rounded-md"
                >
                  <td className="px-16 py-12 flex flex-row items-center justify-center">
                    <img
                      className="md:h-50 md:w-50 h-14 w-14 rounded-2xl object-cover"
                      src={image}
                      alt={alt}
                    />
                  </td>
                  <td>
                    <span className="text-center ml-2 font-semibold">
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
                      <button className="bg-green-400 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black ">
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
  );
};
