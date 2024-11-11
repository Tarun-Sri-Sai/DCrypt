import React, { useState, useRef, useEffect } from "react";
import ItemLabel from "./ItemLabel";
import InlineInput from "./InlineInput";
import ItemActions from "./ItemActions";
import ExplorerContents from "./ExplorerContents";
import {
  FaChevronUp as ExpandedIcon,
  FaChevronDown as CollapsedIcon,
} from "react-icons/fa6";
import { FaFileAlt as FileIcon } from "react-icons/fa";
import IconButton from "./IconButton";
import { isValidName, fileSystemComparator } from "../utils";
import { useDcryptContext } from "../contexts/DcryptContext";

const ExplorerTree = ({ updateParent, data, handleDelete, isRoot = true }) => {
  const [isExpanded, setIsExpanded] = useState(isRoot);
  const isDirectory = data.type === "directory";
  const [creating, setCreating] = useState("");
  const [deleted, setDeleted] = useState(false);
  const {
    setFileContents,
    updateOnSave,
    setOpenFileName,
    resetOpenFile,
    selected,
    setSelected,
  } = useDcryptContext();
  const createInputRef = useRef(null);
  const labelRef = useRef(null);

  const handleSubmit = (newText) => {
    if (!isValidName(newText)) {
      setCreating("");
      return;
    }

    for (const child of data.contents) {
      if (child.name === newText) {
        setCreating("");
        return;
      }
    }

    let newObject;
    if (creating === "file") {
      newObject = {
        name: newText,
        type: "file",
        contents: "",
      };
    } else if (creating === "directory") {
      newObject = {
        name: newText,
        type: "directory",
        contents: [],
      };
    }
    updateParent(
      "contents",
      [...data.contents, newObject].sort(fileSystemComparator)
    );
    setIsExpanded(true);
    setCreating("");
  };

  const focusOnCreateInput = () => {
    createInputRef.current?.focus();
  };

  const handleCreateFile = () => {
    setCreating("file");
  };

  const handleCreateDirectory = () => {
    setCreating("directory");
  };

  useEffect(() => {
    if (creating) {
      focusOnCreateInput();
    }
  }, [creating]);

  const actionHandlers = {
    handleCreateFile,
    handleCreateDirectory,
    handleDelete: () => {
      try {
        handleDelete();
        setDeleted(true);
        resetOpenFile();
      } catch (_) {}
    },
  };

  const handleOpenFile = () => {
    setSelected(labelRef.current);
    if (isDirectory) {
      setIsExpanded((prevIsExpanded) => !prevIsExpanded);
    } else {
      setFileContents(data.contents);
      updateOnSave((newContents) => {
        updateParent("contents", newContents);
      });
      setOpenFileName(data.name);
    }
  };

  if (deleted) {
    return null;
  }

  return (
    <div className="pt-1 md:pt-2 flex flex-col w-full">
      <div className="text-2xs sm:text-xs md:text-sm lg:text-base flex flex-row justify-between">
        <div className="flex flex-row gap-1 items-center">
          {!isRoot &&
            (isDirectory ? (
              <IconButton
                action="alternate"
                onClick={() => setIsExpanded((prev) => !prev)}
              >
                {isExpanded ? (
                  <ExpandedIcon size={"0.8em"} />
                ) : (
                  <CollapsedIcon size={"0.8em"} />
                )}
              </IconButton>
            ) : (
              <IconButton action="alternate">
                <FileIcon size={"0.8em"} />
              </IconButton>
            ))}
          <ItemLabel
            ref={labelRef}
            text={data.name}
            renameText={(newName) => {
              updateParent("name", newName);
            }}
            onClick={handleOpenFile}
            highlight={selected && selected === labelRef.current}
          />
        </div>
        {selected && selected === labelRef.current && (
          <ItemActions
            {...actionHandlers}
            showCreateIcons={isDirectory && isExpanded}
            isRoot={isRoot}
          />
        )}
      </div>
      <div className="pl-1.5 md:pl-2.25 lg:pl-3 xl:pl-3.75">
        {creating && (
          <InlineInput ref={createInputRef} handleSubmit={handleSubmit} />
        )}
        {isDirectory && isExpanded && (
          <ExplorerContents data={data} updateParent={updateParent} />
        )}
      </div>
    </div>
  );
};

export default ExplorerTree;
