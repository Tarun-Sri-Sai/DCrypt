import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDcryptContext } from "../contexts/DcryptContext";

const Logout = () => {
  const navigate = useNavigate();
  const { windowProps, vaultProps } = useDcryptContext();

  useEffect(() => {
    window.electron.encryptVault(windowProps.directory, vaultProps.vault);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      You have successfully logged out. Click here to&nbsp;
      <span
        role="button"
        className="text-blue-500 rounded hover:text-blue-600 underline"
        onClick={() => navigate("/login")}
      >
        login
      </span>
    </div>
  );
};

export default Logout;
