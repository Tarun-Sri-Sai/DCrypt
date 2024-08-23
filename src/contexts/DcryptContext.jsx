import React, { createContext, useContext, useState } from "react";

const DIRECTORY_KEY = "dcryptDirectory";
const DcryptContext = createContext();

export const useDcryptContext = () => useContext(DcryptContext);

export const DcryptProvider = ({ children }) => {
  const [vault, setVault] = useState(null);

  const lsDirectory = localStorage.getItem(DIRECTORY_KEY);
  const [directory, setDirectory] = useState(lsDirectory);

  const updateVault = (newVault) => {
    setVault((oldVault) => ({ ...oldVault, ...newVault }));
  };

  const updateDirectory = (newDirectory) => {
    setDirectory(newDirectory);
    localStorage.setItem(DIRECTORY_KEY, newDirectory);
  };

  return (
    <DcryptContext.Provider
      value={{ vault, updateVault, directory, updateDirectory }}
    >
      {children}
    </DcryptContext.Provider>
  );
};
