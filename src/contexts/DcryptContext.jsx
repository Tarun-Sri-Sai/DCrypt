import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { DIRECTORY_KEY } from "../constants";

const DcryptContext = createContext();
export const useDcryptContext = () => useContext(DcryptContext);

export const DcryptProvider = ({ children }) => {
  const storedDirectory = localStorage.getItem(DIRECTORY_KEY);

  const [directory, setDirectory] = useState(storedDirectory);
  const [vault, setVault] = useState({});
  const [password, setPassword] = useState("");
  const [fileContents, setFileContents] = useState("");
  const [openFileName, setOpenFileName] = useState("");
  const [onSave, setOnSave] = useState(() => () => {});
  const [selected, setSelected] = useState(null);

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
    resetOpenFile();
    resetData();
  };

  const resetOpenFile = () => {
    setFileContents("");
    setOpenFileName("");
    updateOnSave(() => {});
  };

  const resetData = () => {
    setVault({});
    setPassword("");
  };

  useEffect(() => {
    const saveVaultOnChange = async () => {
      if (password) {
        await window.electron.encryptVault(vault, directory, password);
      }
    };

    saveVaultOnChange();
  }, [directory, vault]);

  return (
    <DcryptContext.Provider
      value={{
        directory,
        updateDirectory,
        resetDirectory,
        vault,
        setVault,
        updateVault,
        password,
        setPassword,
        fileContents,
        setFileContents,
        onSave,
        updateOnSave,
        openFileName,
        setOpenFileName,
        resetOpenFile,
        resetData,
        selected,
        setSelected,
      }}
    >
      {children}
    </DcryptContext.Provider>
  );
};
