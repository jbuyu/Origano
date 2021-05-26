import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { listTopProducts } from "../actions/productActions";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export const ProductCarousel = () => {
  const dispatch = useDispatch();
  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;
  const [current, setCurrent] = useState(0);
  const length = products.length;
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  
  useEffect(() => {
      dispatch(listTopProducts());
    }, [dispatch]);
    
    if (!Array.isArray(products) || products.length <= 0) {
      return null;
    }
  return (
    <div className="flex flex-col justify-center items-center ">
      {loading ? (
        <HashLoader />
      ) : error ? (
        <span className="p-2 bg-red-300">{error}</span>
      ) : (
        <section className="relative flex h-full justify-center items-center ">
          <AiOutlineArrowLeft
            className="absolute top-1/2 left-8 font-bold text-black z-10 cursor-pointer select-none"
            onClick={prevSlide}
            color="#FF9800"
          />
          <AiOutlineArrowRight
            className="absolute top-1/2 right-8 font-bold text-black z-10 cursor-pointer select-none"
            onClick={nextSlide}
            color="#FF9800"
          />
          {products.map((slide, index) => (
            <Link to={`/product/${slide._id}`}>
              <div
                className={
                  index === current
                    ? "opacity-5 transition duration-1000 transform scale-100"
                    : "opacity-0 transition duration-1000 ease-in-out"
                }
                key={index}
              >
                {index === current && (
                  <img
                    className="rounded-md"
                    src={slide.image}
                    alt={slide.alt}
                    height={600}
                    width={900}
                  />
                )}
                <p>{slide.name}</p>
              </div>
            </Link>
          ))}
        </section>
      )}
    </div>
  );
};
