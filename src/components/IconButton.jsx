import React from "react";
import { fontSizes, iconPalettes } from "../utils/styles";

const IconButton = ({
  children,
  action = "primary",
  size = "label",
  ...buttonProps
}) => {
  return (
    <div
      className={`${fontSizes[size]} ${iconPalettes[action]}`}
      {...buttonProps}
    >
      {children}
    </div>
  );
};

export default IconButton;
