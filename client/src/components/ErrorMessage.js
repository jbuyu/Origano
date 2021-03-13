import React from "react";

const ErrorMessage = ({ children }) => {
  return (
    <div className="bg-red-300 h-28 mt-1">
      <div className="flex flex-row justify-center content-center align-middle text-2xl p-4 rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default ErrorMessage;
