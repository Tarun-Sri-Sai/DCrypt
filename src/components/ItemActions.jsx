import IconButton from "./IconButton";
import {
  FaPlus as CreateFileIcon,
  FaFolderPlus as CreateDirectoryIcon,
} from "react-icons/fa";
import { ImCross as DeleteIcon } from "react-icons/im";

const ItemActions = ({
  handleCreateFile,
  handleCreateDirectory,
  handleDelete,
  showCreateIcons,
  isRoot,
}) => {
  return (
    <div className="flex flex-row gap-1 items-center">
      {showCreateIcons && (
        <>
          <IconButton action={"alternate"} onClick={handleCreateFile}>
            <CreateFileIcon />
          </IconButton>
          <IconButton action={"alternate"} onClick={handleCreateDirectory}>
            <CreateDirectoryIcon />
          </IconButton>
        </>
      )}
      {!isRoot && (
        <IconButton action={"cancel"} onClick={() => handleDelete()}>
          <DeleteIcon size={"0.9em"} />
        </IconButton>
      )}
    </div>
  );
};

export default ItemActions;
