import { CART_ADD_ITEM, REMOVE_CART_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [], shippingAddress:{} }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(
        (cartItem) => cartItem.product === item.product
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.product === existItem.product ? item : cartItem
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress:action.payload,
      }
      case CART_SAVE_PAYMENT_METHOD:
        return {
          ...state,
          paymentMethod:action.payload,
        }
    default:
      return state;
  }
};
