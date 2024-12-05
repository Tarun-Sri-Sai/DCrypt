import { useState, useCallback } from "react";
import { DIRECTORY_KEY } from "../constants";
import { DashboardContext } from "./DashboardContext";

export const DashboardProvider = ({ children }) => {
  const [fileContents, setFileContents] = useState("");
  const [openFileName, setOpenFileName] = useState("");
  const [onSave, setOnSave] = useState(() => () => {});
  const [selected, setSelected] = useState(null);

  const updateOnSave = useCallback((newOnSave) => {
    setOnSave(() => newOnSave);
  }, []);

  const resetDirectory = () => {
    localStorage.removeItem(DIRECTORY_KEY);
    resetOpenFile();
  };

  const resetOpenFile = () => {
    setFileContents("");
    setOpenFileName("");
    updateOnSave(() => {});
    setSelected(null);
  };

  return (
    <DashboardContext.Provider
      value={{
        resetDirectory,
        fileContents,
        setFileContents,
        onSave,
        updateOnSave,
        openFileName,
        setOpenFileName,
        resetOpenFile,
        selected,
        setSelected,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
