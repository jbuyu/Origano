import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { listUsers, deleteUser } from "../../actions/userActions";

import { HashLoader } from "react-spinners";

import { GrUserAdmin } from "react-icons/gr";
import { FiUser } from "react-icons/fi";
import { FaUserEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

export const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <>
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
                  <th className="font-semibold text-sm uppercase px-6 py-6 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map(({ _id, name, email, isAdmin }) => (
                  <tr key={_id}>
                    <td className="px-6 py-4">
                      <p className="">{_id}</p>
                    </td>
                    <td className="px-6 py-4 text-center">{name}</td>
                    <td className="px-6 py-4 text-center">
                      <a href={`mailTo:${email}`}>{email}</a>
                    </td>
                    <td>{isAdmin ? <GrUserAdmin /> : <FiUser />}</td>

                    <td className="px-6 py-4 text-center">
                      <Link className="px-1" to={`user/${_id}/edit`}>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
