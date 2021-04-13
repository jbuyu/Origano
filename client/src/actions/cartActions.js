import axios from "axios";
import BASE_URL from "../api";
import { CART_ADD_ITEM, CART_SAVE_SHIPPING_ADDRESS, REMOVE_CART_ITEM, CART_SAVE_PAYMENT_METHOD } from "../constants/cartConstants";
export const addToCart = (id, qty) => async (dispatch, getstate) => {
  const { data } = await axios.get(`${BASE_URL}/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      brand: data.brand,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getstate().cart.cartItems));
};

export const removeFromCart = (id)=>(dispatch, getstate)=>{
  dispatch({
    type: REMOVE_CART_ITEM,
    payload:id
  })
  localStorage.setItem('cartItems', JSON.stringify(getstate().cart.cartItems))
}

export const saveShippingAddress = (data)=>(dispatch)=>{
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data
  })
  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data)=>(dispatch)=>{
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data
  })
  // localStorage.setItem('shippingAddress', JSON.stringify(data))
}