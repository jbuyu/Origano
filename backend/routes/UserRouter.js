import express from "express";
import {protect} from '../middleware/authMiddleware.js'

const router = express.Router()

import {
    authUser,
    getUsers,
    getUserProfile,
    registerUser
} from '../controllers/userController.js'

router.get('/', getUsers)
router.route('/profile').get(protect,getUserProfile) 
router.post('/login', authUser)
router.post('/register', registerUser)


export default router;