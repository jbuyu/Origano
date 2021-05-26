import React from "react";
import { Link } from "react-router-dom";

export const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <ul className="flex">
        {[...Array(pages).keys()].map((x) => (
          <li className="mx-1 px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
            <Link
              className="font-bold"
              key={x + 1}
              to={
                keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`
              }
            >
              {x + 1 === page ? (
                <span className="text-red-400">{x + 1}</span>
              ) : (
                <span>{x + 1}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    )
  );
};