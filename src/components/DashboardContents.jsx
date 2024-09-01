import React from "react";
import ExplorerTree from "./ExplorerTree";
import Editor from "./Editor";
import { useDcryptContext } from "../contexts/DcryptContext";

const DashboardContents = () => {
  const { vault, updateVault } = useDcryptContext();

  const updateRoot = (key, value) => {
    if (key === "name" || key === "type") {
      return;
    }

    updateVault(key, value);
  };

  return (
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
  );
};

export default DashboardContents;
