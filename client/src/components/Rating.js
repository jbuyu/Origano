import React from "react";
import { FcRating } from "react-icons/fc";
import PropTypes from "prop-types";

const Rating = ({ value, text }) => {
  if (value === 1) {
    return <FcRating />;
  } else if (value === 2) {
    return (
      <div className="flex flex-row">
        <FcRating />
        <FcRating />
      </div>
    );
  } else if (value === 3) {
    return (
      <div className="flex flex-row">
        <FcRating />
        <FcRating />
        <FcRating />
      </div>
    );
  } else if (value === 4) {
    return (
      <div className="flex flex-row">
        <FcRating />
        <FcRating />
        <FcRating />
        <FcRating />
      </div>
    );
  } else if (value === 5) {
    return (
      <div className="flex flex-row">
        <FcRating />
        <FcRating />
        <FcRating />
        <FcRating />
        <FcRating />
      </div>
    );
  }
};

Rating.prototype = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string,
};

export default Rating;
