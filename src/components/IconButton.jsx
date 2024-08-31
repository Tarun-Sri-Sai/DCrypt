import React from "react";
import { fontSizes, paddings } from "../utils/styles";

const IconButton = ({ children, action = "primary", ...buttonProps }) => {
  return (
    <div
      className={`${paddings.icon} ${fontSizes.label} flex items-center justify-center bg-white text-blue-500`}
      {...buttonProps}
    >
      {children}
    </div>
  );
};

export default IconButton;
