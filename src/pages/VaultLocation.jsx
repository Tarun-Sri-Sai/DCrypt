import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";
import { DIRECTORY_KEY } from "../constants";

const VaultLocation = () => {
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

      localStorage.setItem(DIRECTORY_KEY, selectedDirectory);
      setIsLoading(false);
    };

    if (isLoading) getDirectory();
  }, [isLoading]);

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
