import express from "express";
import {protect} from '../middleware/authMiddleware.js'

const router = express.Router()

import {
    authUser,
    getUsers,
    getUserProfile,
    registerUser,
    updateUserProfile
} from '../controllers/userController.js'

router.get('/', getUsers)
router.route('/profile').get(protect,getUserProfile).put(protect, updateUserProfile)
router.post('/login', authUser)
router.post('/register', registerUser)


export default router;