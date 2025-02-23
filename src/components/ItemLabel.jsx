import { forwardRef, useState } from "react";
import InlineInput from "./InlineInput";
import { isValidName } from "../utils";

const ItemLabel = forwardRef(
  ({ text, renameText, onClick, highlight }, ref) => {
    const [renaming, setRenaming] = useState(false);

    const handleSubmit = (newText) => {
      if (isValidName(newText)) {
        renameText(newText);
      }

      setRenaming(false);
    };

    const handleRenaming = () => {
      setRenaming(true);
    };

    return (
      <>
        {renaming ? (
          <InlineInput
            ref={(el) => setTimeout(() => el && el.focus(), 0)}
            handleSubmit={handleSubmit}
            initialText={text}
          />
        ) : (
          <span
            ref={ref}
            tabIndex={0}
            className="px-1 md:px-2"
            onClick={onClick}
            onKeyUp={(e) => {
              if (e.key === "F2") {
                e.preventDefault();
                handleRenaming();
              }
            }}
            style={{ textDecoration: highlight ? "underline" : "none" }}
          >
            {text}
          </span>
        )}
      </>
    );
  },
);

ItemLabel.displayName = "ItemLabel";

export default ItemLabel;
