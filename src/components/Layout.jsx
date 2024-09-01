import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDcryptContext } from "../contexts/DcryptContext";
import Loader from "./Loader";

const Layout = () => {
  const [isExiting, setIsExiting] = useState(false);
  const { directory, vault } = useDcryptContext();

  useEffect(() => {
    window.electron.onRequestEncryption(async () => {
      setIsExiting(true);
    });
  }, []);

  useEffect(() => {
    const saveOnExit = async () => {
      if (isExiting) {
        await window.electron.encryptVault(directory, vault);
        setIsExiting(false);
      }
    };

    saveOnExit();
  }, [directory, vault, isExiting]);

  return (
    <>
      {isExiting ? <Loader message={"Encrypting your vault..."} /> : <Outlet />}
    </>
  );
};

export default Layout;
