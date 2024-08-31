import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDcryptContext } from "../contexts/DcryptContext";
import Loader from "../components/Loader";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { windowProps } = useDcryptContext();
  const navigate = useNavigate();

  useEffect(() => {
    const checkDirectoryAndVault = async () => {
      if (windowProps.directory === null) {
        navigate("/vault-location");
      }

      const result = await window.electron.checkVault(windowProps.directory);
      if (!result) {
        navigate("/signup");
      }

      setIsLoading(false);
    };

    checkDirectoryAndVault();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader message={"Checking whether vault exists. Please wait"} />
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export default Login;
