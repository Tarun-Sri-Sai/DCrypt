import classNames from "classnames";
import React from "react";

const Input = ({ borderColor, id, label, ...inputProps }) => {
  const inputClass = classNames(
    "w-64",
    "py-1",
    "px-2",
    "border",
    "rounded",
    `border-${borderColor}`,
    "transition-all",
    "focus:outline-none"
  );

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-gray-700 text-sm">
        {label}
      </label>
      <input className={inputClass} id={id} {...inputProps} />
    </div>
  );
};

export default Input;
