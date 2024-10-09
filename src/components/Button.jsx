import React from "react";

const Button = ({ children, action = "primary", ...buttonProps }) => {
  const buttonPalettes = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    alternate:
      "border border-blue-500 hover:border-blue-600 text-blue-500 hover:text-blue-600",
    cancel: "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <button
      className={`py-0.75 sm:py-1 md:py-1.25 lg:py-1.5 px-1.5 sm:px-2 md:px-2.5 lg:px-3 text-2xs sm:text-xs md:text-sm lg:text-base rounded-md md:rounded-lg hover:drop-shadow-2xl ${buttonPalettes[action]}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
