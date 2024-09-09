import React, { useState, useEffect } from "react";
import ExplorerTree from "./ExplorerTree";
import Editor from "./Editor";
import { useDcryptContext } from "../contexts/DcryptContext";
import Loader from "./Loader";
import { isValidItem } from "../utils";

const DashboardContents = () => {
  const { vault, setVault, updateVault } = useDcryptContext();
  const [isLoading, setIsLoading] = useState(true);

  const createStarterVault = () => {
    setVault({ name: "root", type: "directory", contents: [] });
  };

  useEffect(() => {
    const isValid = isValidItem(vault);
    if (!isValid) {
      window.electron.sendAlert(
        "The given vault is invalid! Creating a starter vault"
      );
      createStarterVault();
    }

    setIsLoading(false);
  }, []);

  const updateRoot = (key, value) => {
    if (key === "name" || key === "type") {
      return;
    }

    updateVault(key, value);
  };

  return (
    <>
      {isLoading ? (
        <Loader message={"Validating vault schema. Please wait"} />
      ) : (
        <div className="flex flex-row w-full">
          <div className="w-1/3 sm:w-1/4 lg:w-1/5">
            <ExplorerTree
              updateParent={updateRoot}
              data={vault}
              handleDelete={null}
            />
          </div>
          <div className="w-2/3 sm:w-3/4 lg:w-4/5">
            <Editor />
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardContents;
