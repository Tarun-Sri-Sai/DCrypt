import ExplorerTree from "./ExplorerTree";

const ExplorerContents = ({ path, data, setParentContents }) => {
  return (
    data &&
    data.contents.map((item, index) => {
      const handleChildDelete = async () => {
        const confirmed = await window.electron.sendConfirm(
          `Do you really want to delete ${item.name}?`,
        );

        if (!confirmed) {
          return false;
        }

        const newContents = data.contents.filter((_, i) => i !== index);
        await setParentContents("contents", newContents);
        return true;
      };

      return (
        <ExplorerTree
          key={item.name}
          path={[...path, "contents", index]}
          handleDelete={handleChildDelete}
        />
      );
    })
  );
};

export default ExplorerContents;
