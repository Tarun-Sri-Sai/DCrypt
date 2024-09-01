import React, { useState } from "react";
import InlineInput from "./InlineInput";
import { isValidName } from "../utils/validation";

const ItemLabel = ({ text, renameText, onClick }) => {
  const [renaming, setRenaming] = useState(false);
  const handleSubmit = (newText) => {
    if (isValidName(newText)) {
      renameText(newText);
    }

    setRenaming(false);
  };

  return (
    <>
      {renaming ? (
        <InlineInput handleSubmit={handleSubmit} />
      ) : (
        <span
          className="px-1 md:px-2"
          onClick={onClick}
          onContextMenu={() => setRenaming((prev) => !prev)}
        >
          {text}
        </span>
      )}
    </>
  );
};

export default ItemLabel;
