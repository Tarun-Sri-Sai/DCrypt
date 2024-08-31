import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useDcryptContext } from "../contexts/DcryptContext";
import DashboardView from "../components/DashboardView";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const context = useDcryptContext();
  const navigate = useNavigate();

  useEffect(() => {
    const checkDirectoryAndPassword = async () => {
      const password = await window.electron.getPassword();
      if (context.directory === null || password === null) {
        navigate("/");
      }

      setIsLoading(false);
    };

    checkDirectoryAndPassword();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader message={"Checking vault access. Please wait"} />
      ) : (
        <>
          {context.vault === null ? (
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
