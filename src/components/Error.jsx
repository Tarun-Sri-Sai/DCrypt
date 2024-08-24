import React from "react";

const Error = ({ message }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600">
          {message || "An error occured"}
        </h1>
      </div>
    </div>
  );
};

export default Error;
