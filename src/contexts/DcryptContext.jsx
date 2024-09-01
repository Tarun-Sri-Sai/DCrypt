import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { DIRECTORY_KEY } from "../utils/constants";

const DcryptContext = createContext();
export const useDcryptContext = () => useContext(DcryptContext);

export const DcryptProvider = ({ children }) => {
  const [vault, setVault] = useState({});

  const lsDirectory = localStorage.getItem(DIRECTORY_KEY);
  const [directory, setDirectory] = useState(lsDirectory);

  const [fileContents, setFileContents] = useState("");
  const [openFileName, setOpenFileName] = useState("");
  const [onSave, setOnSave] = useState(() => () => {});

  const updateOnSave = useCallback((newOnSave) => {
    setOnSave(() => newOnSave);
  }, []);

  const updateVault = (key, value) => {
    setVault((oldVault) => ({ ...oldVault, [key]: value }));
  };

  const updateDirectory = (newDirectory) => {
    if (newDirectory !== null) {
      setDirectory(newDirectory);
      localStorage.setItem(DIRECTORY_KEY, newDirectory);
    }
  };

  const resetDirectory = () => {
    setDirectory(null);
    localStorage.removeItem(DIRECTORY_KEY);
  };

  const resetOpenFile = () => {
    setFileContents("");
    setOpenFileName("");
    updateOnSave(() => {});
  };

  useEffect(() => {
    const saveVaultOnChange = async () => {
      const passwordExists = await window.electron.getPassword();
      if (passwordExists) {
        await window.electron.encryptVault(directory, vault);
      }
    };

    saveVaultOnChange();
  }, [directory, vault]);

  return (
    <DcryptContext.Provider
      value={{
        vault,
        updateVault,
        setVault,
        directory,
        updateDirectory,
        resetDirectory,
        fileContents,
        setFileContents,
        onSave,
        updateOnSave,
        openFileName,
        setOpenFileName,
        resetOpenFile,
      }}
    >
      {children}
    </DcryptContext.Provider>
  );
};
