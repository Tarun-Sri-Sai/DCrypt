import React, { useEffect, useState } from "react";
import { useDcryptContext } from "../contexts/DcryptContext";
import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";

const VaultLocation = () => {
  const { updateDirectory } = useDcryptContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDirectory = async () => {
      const [selectedDirectory, selectionError] =
        await window.electron.selectDirectory();

      if (selectionError) {
        window.electron.sendAlert("You need to select a directory to proceed.");
        await getDirectory();
        return;
      }

      updateDirectory(selectedDirectory);
      setIsLoading(false);
    };

    getDirectory();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader
          message={
            "Select a directory from the dialog. This is where the vault will be stored"
          }
        />
      ) : (
        <Navigate to="/signup" />
      )}
    </>
  );
};

export default VaultLocation;
