import express from "express";
import {protect} from '../middleware/authMiddleware.js'

const router = express.Router()

import {
    addOrderItems
} from '../controllers/orderController.js'


router.route('/').post(protect, addOrderItems)


export default router;