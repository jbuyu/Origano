import classNames from "classnames";
import React, { useState } from "react";
function Dropdown({ options, onOptionSelect }) {
  // Keep track of whether the dropdown is open or not.
  const [isActive, setActive] = useState(false);

  const buttonClasses = `inline-flex justify-center w-25 rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-blue-500 active:text-gray-200 transition ease-in-out duration-150`;

  return (
    // Toggle the dropdown if the button is clicked
    <>
      <button onClick={() => setActive(!isActive)} className={buttonClasses}>
        Options
      </button>
      <div
        className={classNames(
          "origin-top-left absolute mt-2 w-56 rounded-md shadow-lg bg-purple-50",
          {
            block: isActive,
            hidden: !isActive,
          }
        )}
      >
        {options.map((option) => (
          <div
            className="p-1 ml-2"
            key={option}
            onClick={(e) => onOptionSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </>
  );
}

export default Dropdown;
