import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import ErrorMessage from "../ErrorMessage";
import Select from "react-select";

export const CartScreen = ({ match, history, location }) => {
  const productID = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  let dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  // console.log(cartItems);
  const changeQuant = () => {
    console.log("change");
  };
  const removeCartItem = (product) => {
    console.log(product);
    dispatch(removeFromCart(product))
  };
  const checkoutButton = ()=>{
    //do sth
    history.push('/login?redirect=shipping')
  }

  useEffect(() => {
    dispatch(addToCart(productID, qty));
  }, []);
  return (
    <div className="container mx-auto mt-10">
      <div className="flex shadow-md my-10">
        <div className="w-full bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <div className="flex flex-col">

            <h2 className="font-semibold text-lg">
              { cartItems && cartItems.reduce((acc, item)=>acc + item.qty, 0)} Items
            </h2>

            <h2 className="font-semibold text-lg text-indigo-400">
              { cartItems && cartItems.reduce((acc, item)=>acc + item.qty * item.price, 0).toFixed(2)} /-
            </h2>
            </div>
          </div>
          <table className="w-full">
            <thead className="flex mt-10 mb-5">
              <tr className="py-2 flex w-3/5 content-center">
                <th className="font-semibold text-gray-600 text-center  uppercase w-3/5 text-xs py-4 ">
                  Product Details
                </th>
                <th className="font-semibold  text-gray-600  uppercase w-2/5 text-left text-xs  py-4">
                  Quantity
                </th>
                <th className="font-semibold  text-gray-600  uppercase w-2/5 text-center text-xs  py-4">
                  Price
                </th>
                <th className="font-semibold  text-gray-600  uppercase w-2/5 text-center text-xs  py-4">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="mt-10 mb-5 w-full">
              {cartItems ? (
                cartItems.map(
                  ({
                    countInStock,
                    image,
                    name,
                    brand,
                    price,
                    product,
                    qty,
                  }) => (
                    <tr
                      key={product}
                      className="flex items-center hover:bg-gray-100 -mx-8 px-4 py-5 w-3/5"
                    >
                      <td className="flex font-semibold text-gray-600 text-center w-3/5  py-4">
                        <div className="w-20">
                          <img
                            className="h-16 w-16 rounded-xl"
                            src={image}
                            // alt={alt}
                          />
                        </div>
                        <div className="flex flex-col justify-between ml-4 flex-grow">
                          <span className="text-sm text-center w-1/5 font-semibold ">
                            {name}
                          </span>
                          <span className="text-red-400 text-xs w-2/5 ">
                            {brand}
                          </span>
                          <a
                            onClick={() => {
                              removeCartItem(product);
                            }}
                            href="#"
                            className="font-semibold hover:text-red-600 text-gray-500 text-xs text-center w-1/5 mt-2"
                          >
                            Remove
                          </a>
                        </div>
                      </td>

                      <td className="font-semibold  text-black  uppercase w-2/5 text-center text-xs px-4 py-4 flex flex-row">
                        <input
                          className="mx-2 border text-center w-10 h-8"
                          type="text"
                          value={qty}
                          onChange={(e) =>
                            dispatch(addToCart(product, Number(e.target.value)))
                          }
                        />
                        <div className="text-xs text-gray-400 text-center py-2">
                          {countInStock}
                        </div>
                        {/* <Select
                        className="w-2/3 mt-2"
                        defaultValue={qty}
                        onChange={(e)=> dispatch(addToCart(product, Number(e.target.value)))}
                        options={[...Array(countInStock).keys()].map(
                          (count) => ({
                            label: count + 1,
                            value: count + 1,
                          })
                        )}
                      /> */}
                      </td>
                      <td className="font-semibold  text-gray-600  uppercase w-2/5 text-right text-sm px-4 py-4">
                        {price}
                      </td>
                      <td className="font-semibold  text-gray-600  uppercase w-2/5 text-right text-sm px-4 py-4">
                        {qty * price}
                      </td>
                    </tr>
                  )
                )
              ) : (
                <p>
                  <ErrorMessage>Couldn't find product</ErrorMessage>
                </p>
              )}
            </tbody>
          </table>
          <Link
            to="/"
            className="flex font-semibold text-indigo-600 text-sm mt-10"
          >
            <svg
              className="fill-current mr-2 text-indigo-600 w-4"
              viewBox="0 0 448 512"
            >
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Order Summary
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Items {cartItems.reduce((acc, item)=> acc + item.qty, 0)}</span>
            <span className="font-semibold text-sm">{cartItems.reduce((acc, item)=> acc + item.qty * item.price, 0).toFixed(2)}</span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">
              Shipping
            </label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping - $10.00</option>
            </select>
          </div>
          <div className="py-10">
            <label
              htmlFor="promo"
              className="font-semibold inline-block mb-3 text-sm uppercase"
            >
              Promo Code
            </label>
            <input
              type="text"
              id="promo"
              placeholder="Enter your code"
              className="p-2 text-sm w-full"
            />
          </div>
          <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase rounded-sm">
            Apply
          </button>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>$600</span>
            </div>
            {
              cartItems.length > 0 &&
            <button onClick={checkoutButton} className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
              Checkout
            </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};
