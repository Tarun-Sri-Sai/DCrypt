import classNames from "classnames";
import React from "react";

const Button = ({ message, color, text, ...buttonProps }) => {
  const buttonClass = classNames(
    `bg-${color}-500`,
    `hover:bg-${color}-600`,
    `text-${text}`,
    "py-1.5",
    "px-3",
    "text-sm",
    "rounded"
  );

  return (
    <button className={buttonClass} {...buttonProps}>
      {message}
    </button>
  );
};

export default Button;
