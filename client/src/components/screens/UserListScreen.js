import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { listUsers } from "../../actions/userActions";

import { HashLoader } from "react-spinners";

export const UserListScreen = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);
  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <HashLoader />
      ) : error ? (
        <span className="text-sm bg-red-300 rounded-lg px-10 py-2 mb-4">
          {error}
        </span>
      ) : (
        <div className="min-h-screen flex items-center px-4">
          <div className=" w-full">
            <table className="mx-auto max-w-5xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
              <thead className="bg-gray-50">
                <tr className="text-gray-600 text-left">
                  <th className="font-semibold text-sm uppercase px-6 py-4">
                    ID
                  </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4">
                    NAME
                  </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                    EMAIL
                  </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                    ADMIN
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map(({ _id, name, email }) => (
                  <tr key={_id}>
                    <td className="px-6 py-4">
                      <p className="">{_id}</p>
                    </td>
                    <td className="px-6 py-4 text-center">{name}</td>
                    <td className="px-6 py-4 text-center">{totalPrice} /-</td>

                    <td className="px-6 py-4 text-center">
                      <a href={`mailTo:${email}`}>{email}</a>
                    </td>
                   
                    <td className="px-6 py-4 text-center">
                      <Link to="/details">
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                          Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
