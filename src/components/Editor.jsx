import React, { useState, useEffect, useCallback } from "react";
import { fontSizes, paddings } from "../utils/styles";
import ErrorBox from "./ErrorBox";
import { useDcryptContext } from "../contexts/DcryptContext";

const Editor = () => {
  const { fileContents, onSave, openFileName } = useDcryptContext();
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    setContent(fileContents);
    setFileName(openFileName);
  }, [openFileName, fileContents]);

  const handleSave = useCallback(() => {
    if (onSave) {
      onSave(content);
      setInfo("Saved!");
      setTimeout(() => setInfo(""), 3000);
    }
  }, [onSave, content]);

  if (!fileName) {
    return <ErrorBox message={"Select a file to view its contents"} />;
  }

  return (
    <div className={`${paddings.main} ${fontSizes.label} flex flex-col`}>
      <h2 className="text-xl mb-2">{openFileName}</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-grow mb-2 p-2 border rounded editor"
        style={{ fontFamily: "monospace", width: "100%", height: "100%" }}
      />
      <button
        onClick={handleSave}
        className="mt-2 self-end bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>
      {info && <div className="mt-2 self-end text-green-500">Saved!</div>}
    </div>
  );
};

export default Editor;
