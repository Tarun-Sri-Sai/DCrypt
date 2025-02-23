import { useState } from "react";
import ErrorBox from "./ErrorBox";
import { useDashboardContext } from "../contexts/DashboardContext";
import InfoText from "./InfoText";
import { INFO_TIMEOUT } from "../constants";
import ErrorText from "./ErrorText";

const Editor = () => {
  const { fileContext } = useDashboardContext();
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [info, setInfo] = useState("");
  const [saveReminder, setSaveReminder] = useState("");
  const saveReminderText =
    "Press Ctrl+S to save. Otherwise changes will be lost";

  const updateInfo = (message) => {
    setInfo(message);
    setTimeout(() => setInfo(""), INFO_TIMEOUT);
  };

  if (fileName !== fileContext.name) {
    setContent(fileContext.contents);
    setFileName(fileContext.name);
    setSaveReminder(saveReminderText);
  }

  if (!fileName) {
    return <ErrorBox message={"Select a file to view its contents"} />;
  }

  return (
    <div
      className="p-1 sm:p-2 lg:p-4 text-2xs sm:text-xs md:text-sm lg:text-base flex flex-col h-full"
      onKeyDown={(e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "s") {
          e.preventDefault();
          if (!fileContext.onSave) {
            return;
          }
          fileContext.onSave(content);
          updateInfo("Saved!");
          setSaveReminder("");
        }
      }}
      tabIndex={0}
    >
      <h2 className="text-sm sm:text-base md:text-lg lg:text-xl mb-2">
        {fileContext.name}
      </h2>
      <textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          setSaveReminder(saveReminderText);
        }}
        className="flex-grow mb-2 p-2 border rounded font-mono"
      />
      <ErrorText message={saveReminder} />
      <InfoText message={info} />
    </div>
  );
};

export default Editor;
