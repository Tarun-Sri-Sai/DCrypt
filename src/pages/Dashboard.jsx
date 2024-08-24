import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useDcryptContext } from "../contexts/DcryptContext";
import VaultForm from "../components/VaultForm";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { directory, vault } = useDcryptContext();
  const navigate = useNavigate();

  useEffect(() => {
    const checkDirectoryAndPassword = async () => {
      const password = await window.electron.getPassword();
      if (directory === null || password === null) {
        navigate("/");
      }
    };

    checkDirectoryAndPassword();
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader message={"Checking directory and password. Please wait"} />
      ) : (
        <>
          {vault === null ? (
            <Navigate to="/signup" />
          ) : (
            <>
              <div>{JSON.stringify(vault)}</div>
              <VaultForm />
              <div className="flex flex-col items-center justify-center">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={() => navigate("/logout")}
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Dashboard;
