import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useDcryptContext } from "../contexts/DcryptContext";
import VaultForm from "../components/VaultForm";
import Button from "../components/Button";

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
              <div className="flex flex-row items-center justify-between p-2">
                <h1 className="text-2xl font-bold">Welcome!</h1>
                <Button
                  type="button"
                  onClick={() => navigate("/logout")}
                  message={"Logout"}
                  color={"blue"}
                  text={"white"}
                />
              </div>
              <div>{JSON.stringify(vault)}</div>
              <VaultForm />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Dashboard;
