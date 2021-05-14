import consola from "consola";
import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desc     Post user data
//@route    POST /api/users/auth
//access    Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // res.send({email, password})

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    consola.success("Authenticating user");
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    consola.error("nop");

    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc     Register User
//@route    POST /api/users/register
//access    Public

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already Exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("Invalid User Data");
  }
});

//@desc     Fetch user profile
//@route    GET /api/users/profile
//access    Private
const getUserProfile = asyncHandler(async (req, res) => {
  // res.send('Success')
  const user = await User.findById(req.user._id);
  //   console.log(user)

  if (user) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc     Update user profile
//@route    PUT /api/users/profile
//access    Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    (user.name = req.body.name || user.name),
      (user.email = req.body.email || user.email);
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
    console.log("updatt");
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc     Get Users
//@route    GET /api/users
//access    privare/admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});



//@desc     Delete Users
//@route    DELETE /api/users/:id
//access    privare/Admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if(user){
    await user.remove()
    res.json({
      message: "User has been deleted"
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser
};
