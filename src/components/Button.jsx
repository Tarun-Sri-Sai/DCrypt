import React from "react";
import { buttonPalettes, fontSizes } from "../utils/styles";

const Button = ({ children, action = "primary", ...buttonProps }) => {
  return (
    <button
      className={`py-1 sm:py-1.25 md:py-1.5 px-2 sm:px-2.5 md:px-3 ${fontSizes.button} rounded-md md:rounded-lg ${buttonPalettes[action]}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
