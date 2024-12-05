import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import LoginForm from "../components/LoginForm";
import { DIRECTORY_KEY } from "../constants";

const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkDirectoryAndVault = async () => {
      const directory = localStorage.getItem(DIRECTORY_KEY);
      if (directory === null) {
        navigate("/vault-location");
        return;
      }

      const hasVaultFile = await window.electron.hasVaultFile(directory);
      if (!hasVaultFile) {
        navigate("/signup");
        return;
      }

      setIsLoading(false);
    };

    if (isLoading) checkDirectoryAndVault();
  }, [isLoading, navigate]);

  return (
    <>
      {isLoading ? (
        <Loader message={"Searching for the vault file. Please wait"} />
      ) : (
        <LoginForm
          onSuccess={async () => {
            navigate("/dashboard");
          }}
        >
          Go to vault
        </LoginForm>
      )}
    </>
  );
};

export default Login;
