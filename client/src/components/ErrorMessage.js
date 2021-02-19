import React from "react";

const ErrorMessage = ({ children }) => {
  return (
    <div className="bg-red-100 h-96 min-h-full">
      <div className="flex flex-row justify-center content-center align-middle text-3xl p-4">
        {children}
      </div>
    </div>
  );
};

export default ErrorMessage;
