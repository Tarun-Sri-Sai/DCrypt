import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useDcryptContext } from "../contexts/DcryptContext";
import DashboardHeader from "../components/DashboardHeader";
import DashboardView from "../components/DashboardView";

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
              <DashboardHeader />
              <DashboardView />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Dashboard;
