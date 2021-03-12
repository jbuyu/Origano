import express from "express";

const router = express.Router()

import {
    authUser,
    getUsers,
    getUserProfile
} from '../controllers/userController.js'

router.get('/', getUsers)
router.get('/profile', getUserProfile)
router.post('/login', authUser)


export default router;