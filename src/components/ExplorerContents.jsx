import ExplorerTree from "./ExplorerTree";

const ExplorerContents = ({ data, updateParent }) => {
  return data.contents.map((item, index) => {
    const handleChildDelete = async () => {
      const [confirmed, confirmError] = await window.electron.confirmDialog(
        `Do you really want to delete ${item.name}?`
      );

      if (confirmError) {
        window.electron.sendAlert(confirmError);
        return;
      }

      if (!confirmed) {
        return false;
      }

      updateParent(
        "contents",
        data.contents.filter((_, i) => i !== index)
      );
      return true;
    };

    const updateChildsParent = (key, value) => {
      const newContents = [...data.contents];
      newContents[index] = { ...data.contents[index], [key]: value };
      updateParent("contents", newContents);
    };

    return (
      <ExplorerTree
        key={item.name}
        data={item}
        handleDelete={handleChildDelete}
        updateParent={updateChildsParent}
        isRoot={false}
      />
    );
  });
};

export default ExplorerContents;
