import React from "react";
import { Navigate } from "react-router-dom";
import { useDcryptContext } from "../contexts/DcryptContext";

const Root = () => {
  const { windowProps } = useDcryptContext();

  return windowProps.directory === null ? (
    <Navigate to={"/vault-location"} />
  ) : (
    <Navigate to={"/login"} />
  );
};

export default Root;
