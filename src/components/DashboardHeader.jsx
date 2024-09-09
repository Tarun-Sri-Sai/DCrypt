import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useDcryptContext } from "../contexts/DcryptContext";
import Header from "./Header";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { vault, resetDirectory } = useDcryptContext();

  return (
    <div className="flex flex-row items-center justify-between p-1 sm:p-2">
      <Header>DCrypt</Header>
      <div className="flex flex-row items-center justify-between gap-1 sm:gap-2">
        <Button
          action="alternate"
          type="button"
          onClick={async () => {
            await window.electron.sendAlert(
              "Make sure to delete the export file after done using"
            );
            await window.electron.exportVault(vault);
          }}
        >
          Export Vault
        </Button>
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
    </div>
  );
};

export default DashboardHeader;
