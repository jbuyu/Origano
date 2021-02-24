import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../actions/cartActions";
import ErrorMessage from "../ErrorMessage";

export const CartScreen = ({ match, history, location }) => {
  const productID = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  let dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  console.log(cartItems);

  useEffect(() => {
    dispatch(addToCart(productID, qty));
  }, []);
  return <div>Cart Screen</div>;
};
