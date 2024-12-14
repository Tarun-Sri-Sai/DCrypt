import { forwardRef, useState, useRef, useEffect } from "react";
import InlineInput from "./InlineInput";
import { isValidName } from "../utils";
import { useDashboardContext } from "../contexts/DashboardContext";

const ItemLabel = forwardRef(
  ({ text, renameText, onClick, highlight }, ref) => {
    const [renaming, setRenaming] = useState(false);
    const renameInputRef = useRef(null);
    const { focusOnInlineInput } = useDashboardContext();

    const handleSubmit = (newText) => {
      if (isValidName(newText)) {
        renameText(newText);
      }

      setRenaming(false);
    };

    const handleRenaming = () => {
      setRenaming((prev) => !prev);
    };

    useEffect(() => {
      if (renaming && renameInputRef.current) {
        focusOnInlineInput(renameInputRef);
      }
    }, [focusOnInlineInput, renaming]);

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
