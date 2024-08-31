import React, { createContext, useContext, useState } from "react";

const DIRECTORY_KEY = "dcryptDirectory";

const DcryptContext = createContext();
export const useDcryptContext = () => useContext(DcryptContext);

export const DcryptProvider = ({ children }) => {
  const [vault, setVault] = useState({});

  const lsDirectory = localStorage.getItem(DIRECTORY_KEY);
  const [directory, setDirectory] = useState(lsDirectory);
  const [isExiting, setIsExiting] = useState(false);

  const updateVault = (key, value) => {
    setVault((oldVault) => ({ ...oldVault, [key]: value }));
  };

  const updateDirectory = (newDirectory) => {
    setDirectory(newDirectory);
    localStorage.setItem(DIRECTORY_KEY, newDirectory);
  };

  window.electron.onRequestEncryption(async () => {
    setIsExiting(true);
    await window.electron.encryptVault(directory, vault);
    setIsExiting(false);
  });

  return (
    <DcryptContext.Provider
      value={{
        vault,
        updateVault,
        setVault,
        directory,
        updateDirectory,
        isExiting,
      }}
    >
      {children}
    </DcryptContext.Provider>
  );
};
