import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { fontSizes } from "../utils/styles";

const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate("/logout");

  return (
    <div className="flex flex-row items-center justify-between p-1 sm:p-2">
      <h1 className={`${fontSizes.header} font-bold`}>DCrypt</h1>
      <Button type="button" onClick={handleClick}>Logout</Button>
    </div>
  );
};

export default DashboardHeader;
