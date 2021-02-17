import React from "react";
import products from "../../products";
const HomeScreen = () => {
  return (
    <div className="px-2">
      <table className="bg-white rounded-lg mx-auto my-6 p-16 table-auto">
        <thead className="justify-between">
          <tr className="bg-gray-200">
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
              <span className="text-gray-600">View</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-200">
          {products.map(({ _id, name, image, description, category }) => {
            return (
              <tr key={_id} className="bg-white border-4 border-gray-200">
                <td className="px-16 py-4 flex flex-row items-center">
                  <img
                    className="h-12 w-12 rounded-2xl object-cover "
                    src={image}
                    alt="organic-image"
                  />
                </td>
                <td>
                  <span className="text-center ml-2 font-semibold">{name}</span>
                </td>
                <td className="px-16 py-4">
                  <span>{description}</span>
                </td>
                <td className="px-16 py-4">{category}</td>
                <td className="px-16 py-4">
                  <button className="bg-green-400 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black ">
                    View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HomeScreen;
