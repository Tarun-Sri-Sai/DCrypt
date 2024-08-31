import React, { useEffect, useState } from "react";
import ExplorerTree from "./ExplorerTree";
import Editor from "./Editor";
import { useDcryptContext } from "../contexts/DcryptContext";
import { validateItem } from "../utils/validation";
import Loader from "./Loader";
import Error from "./Error";

const DashboardBody = () => {
  const { vault, setVault, updateVault } = useDcryptContext();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const createStarterVault = () => {
    setVault({ name: "root", type: "directory", contents: [] });
  };

  useEffect(() => {
    try {
      const result = validateItem(vault);
      if (!result) {
        createStarterVault();
      }
    } catch (err) {
      setError(err.message);
      createStarterVault();
    }

    setIsLoading(false);
  }, [vault]);

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
        <>
          {error ? (
            <Error message={error} />
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
      )}
    </>
  );
};

export default DashboardBody;
