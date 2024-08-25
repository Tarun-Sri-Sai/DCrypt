import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row items-center justify-between p-2">
      <h1 className="text-2xl font-bold">Welcome!</h1>
      <Button
        type="button"
        onClick={() => navigate("/logout")}
        message={"Logout"}
        color={"blue"}
        text={"white"}
      />
    </div>
  );
};

export default DashboardHeader;
