import React, { useState } from "react";

const Input = ({ id, label, ...inputProps }) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className={`text-2xs sm:text-xs md:text-sm lg:text-base ${
          !isInputFocused ? "text-blue-500" : "drop-shadow-2xl text-blue-600"
        }`}
      >
        {label}
      </label>
      <input
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        className="w-64 py-0.75 sm:py-1 md:py-1.25 lg:py-1.5 px-1.5 sm:px-2 md:px-2.5 lg:px-3 border rounded border-blue-500 focus:border-blue-600 focus-within:drop-shadow-2xl focus:outline-none"
        id={id}
        {...inputProps}
      />
    </div>
  );
};

export default Input;
