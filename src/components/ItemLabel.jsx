import React, { forwardRef, useState, useRef } from "react";
import InlineInput from "./InlineInput";
import { isValidName } from "../utils";

const ItemLabel = forwardRef(
  ({ text, renameText, onClick, highlight }, ref) => {
    const [renaming, setRenaming] = useState(false);
    const renameInputRef = useRef(null);

    const handleSubmit = (newText) => {
      if (isValidName(newText)) {
        renameText(newText);
      }

      setRenaming(false);
    };

    const handleRenaming = () => {
      setRenaming((prev) => !prev);
      if (renaming) {
        renameInputRef.current?.focus();
      }
    };

    return (
      <>
        {renaming ? (
          <InlineInput
            ref={renameInputRef}
            handleSubmit={handleSubmit}
            initialText={text}
          />
        ) : (
          <span
            ref={ref}
            className="px-1 md:px-2"
            onClick={onClick}
            onDoubleClick={handleRenaming}
            style={{ textDecoration: highlight ? "underline" : "none" }}
          >
            {text}
          </span>
        )}
      </>
    );
  }
);

ItemLabel.displayName = "ItemLabel";

export default ItemLabel;
