import asyncHandler from "express-async-handler";

import Order from "../models/orderModel.js";

//@desc     Create new Order
//@route    POST /api/orders
//access    Private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createOrder = await order.save()
    res.status(201).json(createOrder)
  }
});

export {addOrderItems}