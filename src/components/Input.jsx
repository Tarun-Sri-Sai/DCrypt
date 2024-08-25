import React from "react";

const Input = ({ borderColor = "blue", id, label, ...inputProps }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-gray-700 text-sm">
        {label}
      </label>
      <input
        className={`w-64 py-1 px-2 border rounded border-${borderColor}`}
        id={id}
        {...inputProps}
      />
    </div>
  );
};

export default Input;
