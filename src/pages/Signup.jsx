import { useState, useEffect } from "react";
import SignupForm from "../components/SignupForm";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { DIRECTORY_KEY } from "../constants";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkVault = async () => {
      const directory = localStorage.getItem(DIRECTORY_KEY);
      if (directory === null) {
        navigate("/get-started");
        return;
      }

      const hasVaultFile = await window.electron.hasVaultFile(directory);
      if (hasVaultFile) {
        navigate("/login");
        return;
      }

      setIsLoading(false);
    };

    if (isLoading) {
      checkVault();
    }
  }, [isLoading, navigate]);

  return (
    <>
      {isLoading ? (
        <Loader message={"Checking for existing vault file. Please wait..."} />
      ) : (
        <SignupForm
          onSuccess={() => {
            navigate("/dashboard");
          }}
        />
      )}
    </>
  );
};

export default Signup;
