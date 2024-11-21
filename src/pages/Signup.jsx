import { useState, useEffect } from "react";
import SignupForm from "../components/SignupForm";
import { useDcryptContext } from "../contexts/DcryptContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Signup = () => {
  const { setPassword } = useDcryptContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { directory } = useDcryptContext();

  useEffect(() => {
    const checkDirectoryAndVault = async () => {
      if (directory === null) {
        navigate("/vault-location");
        return;
      }

      const hasVaultResult = await window.electron.hasVault(directory);
      if (hasVaultResult[0]) {
        navigate("/login");
        return;
      }
      setIsLoading(false);
    };

    checkDirectoryAndVault();
  }, [directory]);

  return (
    <>
      {isLoading ? (
        <Loader message={"Checking for existing vault file. Please wait"} />
      ) : (
        <SignupForm
          onSuccess={(password) => {
            setPassword(password);
            navigate("/dashboard");
          }}
        >
          Create vault
        </SignupForm>
      )}
    </>
  );
};

export default Signup;
