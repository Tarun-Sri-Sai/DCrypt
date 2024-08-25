import React from "react";

const Button = ({
  message,
  color = "blue",
  text = "white",
  ...buttonProps
}) => {
  return (
    <button
      className={`bg-${color}-500 hover:bg-${color}-600 text-${text} py-1.5 px-3 text-sm rounded`}
      {...buttonProps}
    >
      {message}
    </button>
  );
};

export default Button;
