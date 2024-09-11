import React from "react";

const InfoText = ({ message }) => {
  return <>{message && <div className="text-green-500">{message}</div>}</>;
};

export default InfoText;
