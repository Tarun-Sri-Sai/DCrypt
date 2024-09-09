import React from "react";

const Header = ({ children }) => {
  return (
    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
      {children}
    </h1>
  );
};

export default Header;
