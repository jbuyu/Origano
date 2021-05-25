import React from "react";
import { RiStarSLine } from "react-icons/ri";
import PropTypes from "prop-types";

const Rating = ({ value, text }) => {
  if (value === 1) {
    return <RiStarSLine color="#FFA41C" />;
  } else if (value === 2) {
    return (
      <div className="flex flex-row">
        <RiStarSLine color="#FFA41C" />
        <RiStarSLine color="#FFA41C" />
      </div>
    );
  } else if (value === 3) {
    return (
      <div className="flex flex-row">
        <RiStarSLine color="#FFA41C" />
        <RiStarSLine color="#FFA41C" />
        <RiStarSLine color="#FFA41C" />
      </div>
    );
  } else if (value === 4) {
    return (
      <div className="flex flex-row">
        <RiStarSLine color="#FFA41C" />
        <RiStarSLine color="#FFA41C" />
        <RiStarSLine color="#FFA41C" />
        <RiStarSLine color="#FFA41C" />
      </div>
    );
  } else if (value === 5) {
    return (
      <div className="flex flex-row">
        <RiStarSLine color="#FFA41C" />
        <RiStarSLine color="#FFA41C" />
        <RiStarSLine color="#FFA41C" />
        <RiStarSLine color="#FFA41C" />
        <RiStarSLine color="#FFA41C" />
      </div>
    );
  } else if (value === 0){
    return null
  }
};

Rating.prototype = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string,
};

export default Rating;
