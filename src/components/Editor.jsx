import React, { useState, useEffect, useCallback } from "react";
import ErrorBox from "./ErrorBox";
import { useDcryptContext } from "../contexts/DcryptContext";
import Info from "./Info";
import { INFO_TIMEOUT } from "../constants";

const Editor = () => {
  const { fileContents, onSave, openFileName } = useDcryptContext();
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [info, setInfo] = useState("");

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
    }
  }, [onSave, content]);

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
    <div className="p-2 md:p-4 text-xs sm:text-sm md:text-base flex flex-col">
      <h2 className="text-xl mb-2">{openFileName}</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-grow mb-2 p-2 border rounded editor"
        style={{ width: "100%", height: "100%" }}
      />
      <Info message={info} />
    </div>
  );
};

export default Editor;
