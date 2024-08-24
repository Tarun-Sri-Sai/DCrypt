import React, { useEffect, useState } from "react";
import { useDcryptContext } from "../contexts/DcryptContext";
import Loader from "../components/Loader";
import SignupForm from "../components/SignupForm";

const GetStarted = () => {
  const { updateDirectory } = useDcryptContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDirectory = async () => {
      const selectedDirectory = await window.electron.selectDirectory();
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
        <SignupForm />
      )}
    </>
  );
};

export default GetStarted;
