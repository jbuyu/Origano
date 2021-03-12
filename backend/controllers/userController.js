import express from 'express'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

//@desc     Post user data
//@route    POST /api/users/auth
//access    Public

const authUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body
    // res.send({email, password})

    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin:user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})


//@desc     Fetch all users
//@route    GET /api/users
//access    Public
const getUsers = asyncHandler(async(req,res)=>{
    const users = await User.find({})
    res.json(users)
})


//@desc     Fetch all profile
//@route    GET /api/users/profile
//access    Private
const getUserProfile = asyncHandler(async(req,res)=>{
    res.send('Success')
})

export {
    authUser,
    getUsers,
    getUserProfile
}