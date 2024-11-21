import { useState, useEffect } from "react";
import ExplorerTree from "./ExplorerTree";
import Editor from "./Editor";
import { useDcryptContext } from "../contexts/DcryptContext";
import Loader from "./Loader";
import { isValidItem } from "../utils";

const DashboardContents = () => {
  const { vault, setVault, updateVault } = useDcryptContext();
  const [isLoading, setIsLoading] = useState(true);

  const createStarterVault = () => {
    setVault({ name: "My Vault", type: "directory", contents: [] });
  };

  useEffect(() => {
    if (Object.keys(vault).length === 0) {
      createStarterVault();
    } else {
      const isValid = isValidItem(vault);
      if (!isValid) {
        window.electron.sendAlert("Invalid vault, creating a starter vault");
        createStarterVault();
      }
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
        <div className="flex flex-row w-full">
          <div className="w-1/3 md:w-29/100 lg:w-1/4 xl:45/200">
            <ExplorerTree
              updateParent={updateRoot}
              data={vault}
              handleDelete={null}
            />
          </div>
          <div className="w-2/3 md:w-71/100 lg:w-3/4 xl:w-155/200">
            <Editor />
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardContents;
