import React, { useEffect, useState } from "react";
import { useDcryptContext } from "../contexts/DcryptContext";
import { validateItem } from "../utils/validation";
import Loader from "./Loader";
import Error from "./Error";
import DashboardContents from "./DashboardContents";

const DashboardBody = () => {
  const { vault, setVault } = useDcryptContext();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const createStarterVault = () => {
    setVault({ name: "root", type: "directory", contents: [] });
  };

  useEffect(() => {
    try {
      const result = validateItem(vault);
      if (!result) {
        createStarterVault();
      }
    } catch (err) {
      setError(err.message);
      createStarterVault();
    }

    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader message={"Validating vault schema. Please wait"} />
      ) : (
        <>{error ? <Error message={error} /> : <DashboardContents />}</>
      )}
    </>
  );
};

export default DashboardBody;
