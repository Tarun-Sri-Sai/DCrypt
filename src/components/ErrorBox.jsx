import React from "react";

const ErrorBox = ({ message }) => {
  return (
    <div className="flex items-center justify-center p-4 bg-red-100">
      <p className="text-red-600 text-2xs sm:text-xs md:text-sm lg:text-base">{message || "An error occurred"}</p>
    </div>
  );
};

export default ErrorBox;
