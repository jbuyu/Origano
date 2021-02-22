import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../actions/cartActions";
import ErrorMessage from "../ErrorMessage";

export const CartScreen = ({ match, history, locaton }) => {
  const productID = match.params.id;
  return <div>Cart Screen</div>;
};
