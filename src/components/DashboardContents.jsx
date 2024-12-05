import { useState, useEffect } from "react";
import ExplorerTree from "./ExplorerTree";
import Editor from "./Editor";
import { DIRECTORY_KEY } from "../constants";

const DashboardContents = () => {
  const directory = localStorage.getItem(DIRECTORY_KEY);
  const [data, setData] = useState(null);

  const updateRoot = async (key, value) => {
    if (key === "name" || key === "type") {
      return;
    }

    const result = await window.electron.setVaultContents(
      directory,
      [],
      key,
      value
    );
    if (!result) {
      window.electron.sendAlert("Failed to set vault contents");
    }
  };

  useEffect(() => {
    const fetchVault = async () => {
      const fetchedData = await window.electron.getVaultContents(directory, []);
      setData(fetchedData);
    };

    fetchVault();
  }, [directory]);

  return (
    data && (
      <div className="flex flex-row w-full">
        <div className="w-1/3 md:w-29/100 lg:w-1/4 xl:45/200">
          <ExplorerTree
            updateParent={updateRoot}
            data={data}
            handleDelete={null}
          />
        </div>
        <div className="w-2/3 md:w-71/100 lg:w-3/4 xl:w-155/200 h-full">
          <Editor />
        </div>
      </div>
    )
  );
};

export default DashboardContents;
