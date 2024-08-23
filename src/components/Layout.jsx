import React from "react";
import { Outlet } from "react-router-dom";
import { DcryptProvider } from "../contexts/DcryptContext";

const Layout = () => {
  return (
    <DcryptProvider>
      <Outlet />
    </DcryptProvider>
  );
};

export default Layout;
