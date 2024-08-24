import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDcryptContext } from "../contexts/DcryptContext";

const Logout = () => {
  const navigate = useNavigate();
  const { directory, vault } = useDcryptContext();

  useEffect(() => {
    window.electron.encryptVault(directory, vault);
  }, []);

  return (
    <div>
      You have successfully logged out. Click here to{" "}
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
