import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { fontSizes } from "../utils/styles";
import { useDcryptContext } from "../contexts/DcryptContext";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { resetDirectory } = useDcryptContext();

  return (
    <div className="flex flex-row items-center justify-between p-1 sm:p-2">
      <h1 className={`${fontSizes.header} font-bold`}>DCrypt</h1>
      <Button
        action="alternate"
        type="button"
        onClick={() => {
          resetDirectory();
          navigate("/");
        }}
      >
        Reset Directory
      </Button>
      <Button type="button" onClick={() => navigate("/logout")}>
        Logout
      </Button>
    </div>
  );
};

export default DashboardHeader;
