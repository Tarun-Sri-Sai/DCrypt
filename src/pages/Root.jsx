import { Navigate } from "react-router-dom";
import { DIRECTORY_KEY } from "../constants";

const Root = () => {
  return localStorage.getItem(DIRECTORY_KEY) === null ? (
    <Navigate to={"/vault-location"} />
  ) : (
    <Navigate to={"/login"} />
  );
};

export default Root;
