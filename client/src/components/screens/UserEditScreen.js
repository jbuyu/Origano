import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import { HashLoader } from "react-spinners";
import { getUserDetails, updateUser } from "../../actions/userActions";
import { USER_UPDATE_RESET } from "../../constants/userConstants";
import { BiArrowBack } from "react-icons/bi";

export const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [color, setColor] = useState("#FCA5A5");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({
        type: USER_UPDATE_RESET,
      });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, userId, dispatch, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({
      _id:userId,
      name,
      email,
      isAdmin
    }))

    //submit
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
            to="/admin/userList"
          >
            Go Back
          </Link>
        </span>
      </div>
      <div className="lg:flex flex flex-row justify-center items-center">
        <div className="lg:w-1/2 xl:max-w-screen-sm">
          <div className="flex flex-col justify-center items-center" >

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {loadingUpdate && <HashLoader/>}
          {errorUpdate && <ErrorMessage>{error}</ErrorMessage>}
          </div>
          <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
            <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">
              <span className="flex flex-row justify-between items-center">
                Edit User
              </span>
            </h2>
            <div className="mt-12">
              <div className="flex flex-row justify-center items-center">
                {loading ? (
                  <HashLoader color={color}></HashLoader>
                ) : error ? (
                  <ErrorMessage>{error}</ErrorMessage>
                ) : (
                  <form onSubmit={submitHandler}>
                    <div>
                      <div className="text-sm font-bold text-gray-700 tracking-wide">
                        Email Address
                      </div>
                      <input
                        className="w-full text-lg py-2 px-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 rounded-sm"
                        type="email"
                        placeholder="guadalupe@gmail.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mt-8">
                      <div className="flex justify-between items-center">
                        <div className="text-sm font-bold text-gray-700 tracking-wide">
                          Name
                        </div>
                      </div>
                      <input
                        className="w-full text-lg py-2 px-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 rounded-sm"
                        type="text"
                        placeholder="Enter names"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
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
                    <div className="mt-8">
                      <div className="flex justify-between items-center">
                        <span className="ml-2 text-gray-700 font-bold">
                          Is Admin
                        </span>

                        <label className="inline-flex items-center mt-3">
                          <input
                            id="isAdmin"
                            label="Is Admin"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-indigo-400 cursor-pointer"
                          />
                        </label>
                      </div>
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
