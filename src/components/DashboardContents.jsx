import ExplorerTree from "./ExplorerTree";
import Editor from "./Editor";

const DashboardContents = () => {
  return (
    <div className="flex flex-row w-full h-full flex-grow">
      <div className="w-1/3 md:w-29/100 lg:w-1/4 xl:45/200 h-full overflow-y-auto">
        <ExplorerTree path={[]} handleDelete={null} />
      </div>
      <div className="w-2/3 md:w-71/100 lg:w-3/4 xl:w-155/200 h-full flex flex-col ">
        <Editor />
      </div>
    </div>
  );
};

export default DashboardContents;
