import React from "react";

const IconButton = ({ children, action = "primary", ...buttonProps }) => {
  const iconPalettes = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    alternate: "text-blue-500 hover:text-blue-600",
    cancel: "text-red-500 hover:text-red-600",
  };

  return (
    <div
      className={`text-xs sm:text-sm md:text-base ${iconPalettes[action]}`}
      {...buttonProps}
    >
      {children}
    </div>
  );
};

export default IconButton;
