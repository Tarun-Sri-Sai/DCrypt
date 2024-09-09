import React, { useState } from "react";

const Input = ({ id, label, ...inputProps }) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className={`text-xs sm:text-sm md:text-base ${
          !isInputFocused ? "text-blue-500" : "drop-shadow-2xl text-blue-600"
        }`}
      >
        {label}
      </label>
      <input
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        className="w-64 py-1 px-2 border rounded border-blue-500 focus:border-blue-600 focus-within:drop-shadow-2xl focus:outline-none"
        id={id}
        {...inputProps}
      />
    </div>
  );
};

export default Input;
