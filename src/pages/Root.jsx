import React from "react";
import { Navigate } from "react-router-dom";
import { useDcryptContext } from "../contexts/DcryptContext";

const Root = () => {
  const context = useDcryptContext();

  return context.directory === null ? (
    <Navigate to={"/vault-location"} />
  ) : (
    <Navigate to={"/login"} />
  );
};

export default Root;
