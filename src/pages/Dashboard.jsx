import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useDcryptContext } from "../contexts/DcryptContext";
import DashboardView from "../components/DashboardView";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { windowProps, vaultProps } = useDcryptContext();
  const navigate = useNavigate();

  useEffect(() => {
    const checkDirectoryAndPassword = async () => {
      const password = await window.electron.getPassword();
      if (windowProps.directory === null || password === null) {
        navigate("/");
      }

      setIsLoading(false);
    };

    checkDirectoryAndPassword();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader message={"Checking password. Please wait"} />
      ) : (
        <>
          {vaultProps.vault === null ? (
            <Navigate to="/signup" />
          ) : (
            <>
              <DashboardView />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Dashboard;
