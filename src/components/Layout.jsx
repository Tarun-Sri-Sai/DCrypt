import React from "react";
import { Outlet } from "react-router-dom";
import { useDcryptContext } from "../contexts/DcryptContext";
import Loader from "./Loader";

const Layout = () => {
  const { windowProps } = useDcryptContext();

  return (
    <>
      {windowProps.isExiting ? (
        <Loader message={"Encrypting your vault..."} />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Layout;
