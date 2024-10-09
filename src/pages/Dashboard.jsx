import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useDcryptContext } from "../contexts/DcryptContext";
import DashboardHeader from "../components/DashboardHeader";
import DashboardContents from "../components/DashboardContents";
import { sortRecursively } from "../utils";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { directory, password, setVault } = useDcryptContext();
  const navigate = useNavigate();

  useEffect(() => {
    const decryptVault = async () => {
      if (directory === null || password === null) {
        navigate("/");
        return;
      }

      const [hasVault, checkError] = await window.electron.hasVault(directory);
      if (checkError || !hasVault) {
        setVault({});
        setIsLoading(false);
        return;
      }

      const [vault, decryptError] = await window.electron.decryptVault(
        directory,
        password
      );
      if (decryptError) {
        window.electron.sendAlert("Something is wrong. Try again");
        navigate("/");
        return;
      }

      setVault(sortRecursively(vault));
      setIsLoading(false);
    };

    decryptVault();
  }, [directory, password]);

  return (
    <>
      {isLoading ? (
        <Loader message={"Decrypting the vault. Please wait"} />
      ) : (
        <>
          <DashboardHeader />
          <DashboardContents />
        </>
      )}
    </>
  );
};

export default Dashboard;
