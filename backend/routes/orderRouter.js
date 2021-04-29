import express from "express";
import {protect} from '../middleware/authMiddleware.js'

const router = express.Router()

import {
    addOrderItems, getOrderById
} from '../controllers/orderController.js'


router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)


export default router;