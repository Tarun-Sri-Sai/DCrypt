import React from "react";

const Button = ({ children, action = "primary", ...buttonProps }) => {
  const palettes = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    alternate:
      "border border-blue-500 hover:border-blue-600 text-blue-500 hover:text-blue-600",
    cancel: "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <button
      className={`py-1.5 px-3 text-sm rounded-lg font-bold ${palettes[action]}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
