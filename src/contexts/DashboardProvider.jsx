import { useState } from "react";
import { DashboardContext } from "./DashboardContext";

export const DashboardProvider = ({ children }) => {
  const [fileContext, setFileContext] = useState({
    contents: "",
    name: "",
    onSave: () => {},
  });
  const [selected, setSelected] = useState(null);
  const [refreshed, setRefreshed] = useState(false);

  return (
    <DashboardContext.Provider
      value={{
        fileContext,
        setFileContext,
        selected,
        setSelected,
        refreshed,
        setRefreshed,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
