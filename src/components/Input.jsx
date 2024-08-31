import React, { useState } from "react";
import { fontSizes } from "../utils/styles";

const Input = ({ id, label, ...inputProps }) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className={`${fontSizes.label} ${
          isInputFocused ? "text-blue-600" : "text-blue-500"
        }`}
      >
        {label}
      </label>
      <input
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        className="w-64 py-1 px-2 border rounded border-blue-500 focus:border-blue-600 focus:outline-none"
        id={id}
        {...inputProps}
      />
    </div>
  );
};

export default Input;
