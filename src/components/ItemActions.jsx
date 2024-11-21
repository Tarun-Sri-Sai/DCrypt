import IconButton from "./IconButton";
import { FaFileCirclePlus as CreateFileIcon } from "react-icons/fa6";
import {
  MdCreateNewFolder as CreateDirectoryIcon,
  MdDeleteForever as DeleteIcon,
} from "react-icons/md";

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
            <CreateFileIcon size={"0.8em"} />
          </IconButton>
          <IconButton action={"alternate"} onClick={handleCreateDirectory}>
            <CreateDirectoryIcon />
          </IconButton>
        </>
      )}
      {!isRoot && (
        <IconButton action={"cancel"} onClick={() => handleDelete()}>
          <DeleteIcon />
        </IconButton>
      )}
    </div>
  );
};

export default ItemActions;
