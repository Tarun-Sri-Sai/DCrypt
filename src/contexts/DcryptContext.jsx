import React, { createContext, useContext, useState } from "react";

const DIRECTORY_KEY = "dcryptDirectory";

const DcryptContext = createContext();
export const useDcryptContext = () => useContext(DcryptContext);

export const DcryptProvider = ({ children }) => {
  const [vault, setVault] = useState({});

  const lsDirectory = localStorage.getItem(DIRECTORY_KEY);
  const [directory, setDirectory] = useState(lsDirectory);

  const updateVault = (newVault) => {
    setVault((oldVault) => ({ ...oldVault, ...newVault }));
  };

  const clearVault = () => setVault({});

  const updateDirectory = (newDirectory) => {
    setDirectory(newDirectory);
    localStorage.setItem(DIRECTORY_KEY, newDirectory);
  };

  window.electron.onRequestEncryption(() => {
    window.electron.encryptVault(directory, vault);
  });

  return (
    <DcryptContext.Provider
      value={{ vault, updateVault, directory, clearVault, updateDirectory }}
    >
      {children}
    </DcryptContext.Provider>
  );
};
