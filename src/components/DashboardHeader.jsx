import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate("/logout");

  return (
    <div className="flex flex-row items-center justify-between p-2">
      <h1 className="text-2xl font-bold">Welcome!</h1>
      <Button onClick={handleClick}>Logout</Button>
    </div>
  );
};

export default DashboardHeader;
