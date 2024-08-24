import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDcryptContext } from "../contexts/DcryptContext";
import Loader from "../components/Loader";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { directory } = useDcryptContext();
  const navigate = useNavigate();
  const [vaultExists, setVaultExists] = useState(false);

  useEffect(() => {
    const checkDirectory = async () => {
      if (directory === null) {
        navigate("/");
      }
    };

    const checkVault = async () => {
      const result = await window.electron.checkVault(directory);
      setVaultExists(result);
    };

    checkDirectory();
    checkVault();
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader message={"Checking directory. Please wait"} />
      ) : (
        <>{vaultExists ? <LoginForm /> : <SignupForm />}</>
      )}
    </>
  );
};

export default Login;
