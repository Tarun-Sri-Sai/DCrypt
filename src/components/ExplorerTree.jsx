import { useState, useRef, useEffect, useCallback } from "react";
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
import { isValidName } from "../utils";
import { useDashboardContext } from "../contexts/DashboardContext";
import { DIRECTORY_KEY } from "../constants";

const ExplorerTree = ({ path, handleDelete }) => {
  const isRoot = path.length === 0;
  const directory = localStorage.getItem(DIRECTORY_KEY);
  const [data, setData] = useState(null);
  const [isExpanded, setIsExpanded] = useState(isRoot);
  const [creating, setCreating] = useState("");
  const [deleted, setDeleted] = useState(false);
  const createInputRef = useRef(null);
  const {
    setFileContents,
    updateOnSave,
    setOpenFileName,
    resetOpenFile,
    selected,
    setSelected,
    isImported,
    onHandleImport,
    focusOnCreateInput,
  } = useDashboardContext();
  const labelRef = useRef(null);

  const isDirectory = useCallback(
    () => data && data.type === "directory",
    [data],
  );

  const fetchVaultData = useCallback(async () => {
    const fetchedData = await window.electron.getVaultContents(path);
    setData(fetchedData);
  }, [path]);

  const handleSubmit = async (newText) => {
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
    const result = await window.electron.setVaultContents(
      directory,
      path,
      "contents",
      [...data.contents, newObject],
    );
    if (!result) {
      window.electron.sendAlert("Failed to set vault contents");
      return;
    }

    await fetchVaultData();
    setIsExpanded(true);
    setCreating("");
  };

  const handleCreateFile = () => {
    setCreating("file");
    focusOnCreateInput(createInputRef);
  };

  const handleCreateDirectory = () => {
    setCreating("directory");
    focusOnCreateInput(createInputRef);
  };

  const actionHandlers = {
    handleCreateFile,
    handleCreateDirectory,
    handleDelete: async () => {
      try {
        const result = await handleDelete();
        if (result) {
          setDeleted(true);
          setSelected(null);
          resetOpenFile();
        }
      } catch (err) {
        window.electron.sendAlert(`Unexpected error: ${err}`);
      }
    },
  };

  const handleOpenFile = () => {
    setSelected(labelRef.current);
    if (isDirectory()) {
      if (!(isRoot && isExpanded)) {
        setIsExpanded((prevIsExpanded) => !prevIsExpanded);
      }
    } else {
      setFileContents(data.contents);
      updateOnSave(async (newContents) => {
        const result = await window.electron.setVaultContents(
          directory,
          path,
          "contents",
          newContents,
        );
        if (!result) {
          window.electron.sendAlert("Failed to set vault contents");
          return;
        }

        await fetchVaultData();
      });
      setOpenFileName(data.name);
    }
  };

  useEffect(() => {
    if (isImported) {
      fetchVaultData();
      onHandleImport();
    }
  }, [fetchVaultData, isImported, onHandleImport]);

  useEffect(() => {
    if (!deleted && !data) fetchVaultData();
  }, [data, deleted, directory, fetchVaultData]);

  return (
    !deleted &&
    data && (
      <div className="pt-1 md:pt-2 flex flex-col w-full">
        <div className="text-2xs sm:text-xs md:text-sm lg:text-base flex flex-row justify-between">
          <div className="flex flex-row gap-1 items-center">
            {!isRoot &&
              (isDirectory() ? (
                <IconButton
                  action="alternate"
                  onClick={() => setIsExpanded((prev) => !prev)}
                >
                  {isExpanded ? (
                    <ExpandedIcon size={"0.9em"} />
                  ) : (
                    <CollapsedIcon size={"0.9em"} />
                  )}
                </IconButton>
              ) : (
                <IconButton action="alternate">
                  <FileIcon size={"0.9em"} />
                </IconButton>
              ))}
            <ItemLabel
              ref={labelRef}
              text={data.name}
              renameText={async (newName) => {
                if (isRoot) return;

                const result = await window.electron.setVaultContents(
                  directory,
                  path,
                  "name",
                  newName,
                );
                if (!result) {
                  window.electron.sendAlert("Failed to set vault contents");
                  return;
                }

                await fetchVaultData();
              }}
              onClick={handleOpenFile}
              highlight={selected && selected === labelRef.current}
            />
          </div>
          {(isRoot || (selected && selected === labelRef.current)) && (
            <ItemActions
              {...actionHandlers}
              showCreateIcons={isDirectory() && isExpanded}
              isRoot={isRoot}
            />
          )}
        </div>
        <div className="pl-1.5 md:pl-2.25 lg:pl-3 xl:pl-3.75">
          {creating && (
            <InlineInput ref={createInputRef} handleSubmit={handleSubmit} />
          )}
          {isDirectory() && isExpanded && (
            <ExplorerContents
              path={path}
              data={data}
              setParentContents={async (key, value) => {
                const result = await window.electron.setVaultContents(
                  directory,
                  path,
                  key,
                  value,
                );
                if (!result) {
                  window.electron.sendAlert("Failed to set vault contents");
                  return;
                }

                fetchVaultData();
              }}
            />
          )}
        </div>
      </div>
    )
  );
};

export default ExplorerTree;
