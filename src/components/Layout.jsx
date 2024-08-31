import React from "react";
import { Outlet } from "react-router-dom";
import { useDcryptContext } from "../contexts/DcryptContext";
import Loader from "./Loader";

const Layout = () => {
  const context = useDcryptContext();

  return (
    <>
      {context.isExiting ? (
        <Loader message={"Encrypting your vault..."} />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Layout;
