import React from "react";

const Info = ({ message }) => {
  return <>{message && <div className="text-green-500">{message}</div>}</>;
};

export default Info;
