import React from "react";
import ExplorerTree from "./ExplorerTree";

const ExplorerContents = ({ data, updateParent }) => {
  return data.contents.map((item, index) => {
    const handleChildDelete = () => {
      updateParent(
        "contents",
        data.contents.filter((_, i) => i !== index)
      );
    };

    const updateChildsParent = (key, value) => {
      const newContents = [...data.contents];
      newContents[index][key] = value;
      updateParent("contents", newContents);
    };

    return (
      <ExplorerTree
        key={index}
        data={item}
        handleDelete={handleChildDelete}
        updateParent={updateChildsParent}
        isRoot={false}
      />
    );
  });
};

export default ExplorerContents;
