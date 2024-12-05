import { useState, useEffect, useCallback } from "react";
import ErrorBox from "./ErrorBox";
import { useDcryptContext } from "../contexts/DcryptContext";
import InfoText from "./InfoText";
import { INFO_TIMEOUT } from "../constants";
import ErrorText from "./ErrorText";

const Editor = () => {
  const { fileContents, onSave, openFileName } = useDcryptContext();
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [info, setInfo] = useState("");
  const [saveReminder, setSaveReminder] = useState("");

  const updateInfo = (message) => {
    setInfo(message);
    setTimeout(() => setInfo(""), INFO_TIMEOUT);
  };

  useEffect(() => {
    setContent(fileContents);
    setFileName(openFileName);
  }, [openFileName, fileContents]);

  const handleSave = useCallback(() => {
    if (onSave) {
      onSave(content);
      updateInfo("Saved!");
      setSaveReminder("");
    }
  }, [onSave, content]);

  useEffect(() => {
    setSaveReminder("Press Ctrl+S to save. Otherwise changes will be lost");
  }, [content]);

  useEffect(() => {
    const handleCtrlS = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener("keydown", handleCtrlS);

    return () => {
      window.removeEventListener("keydown", handleCtrlS);
    };
  }, [handleSave]);

  if (!fileName) {
    return <ErrorBox message={"Select a file to view its contents"} />;
  }

  return (
    <div className="p-2 md:p-4 text-2xs sm:text-xs md:text-sm lg:text-base flex flex-col h-full">
      <h2 className="text-sm sm:text-base md:text-lg lg:text-xl mb-2">{openFileName}</h2>
      <textarea
        rows={10}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-grow mb-2 p-2 border rounded font-mono"
        style={{ width: "100%", height: "100%" }}
      />
      <ErrorText message={saveReminder} />
      <InfoText message={info} />
    </div>
  );
};

export default Editor;
