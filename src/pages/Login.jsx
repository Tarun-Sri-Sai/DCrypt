import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDcryptContext } from "../contexts/DcryptContext";
import Loader from "../components/Loader";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { directory, setPassword } = useDcryptContext();
  const navigate = useNavigate();

  useEffect(() => {
    const checkDirectoryAndVault = async () => {
      if (directory === null) {
        navigate("/vault-location");
        return;
      }

      const [hasVault, checkError] = await window.electron.hasVault(directory);
      if (checkError || !hasVault) {
        navigate("/signup");
        return;
      }

      setIsLoading(false);
    };

    checkDirectoryAndVault();
  }, [directory]);

  return (
    <>
      {isLoading ? (
        <Loader message={"Searching for the vault file. Please wait"} />
      ) : (
        <LoginForm
          onSuccess={async (password) => {
            setPassword(password);
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
