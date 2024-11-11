import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useDcryptContext } from "../contexts/DcryptContext";
import Header from "./Header";
import InfoText from "./InfoText";
import { INFO_TIMEOUT } from "../constants";
import { isValidItem, sortRecursively } from "../utils";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { vault, resetDirectory, setVault } = useDcryptContext();
  const [info, setInfo] = useState("");

  const updateInfo = (message) => {
    setInfo(message);
    setTimeout(() => setInfo(""), INFO_TIMEOUT);
  };

  const handleReset = () => {
    resetDirectory();
    navigate("/");
  };

  const handleExport = async () => {
    window.electron.sendAlert(
      "Make sure to delete the export file after using it"
    );
    const [exportFile, exportError] = await window.electron.exportVault(vault);

    if (exportError) {
      window.electron.sendAlert(exportError);
      return;
    }

    updateInfo(`Vault has been exported to ${exportFile}!`);
  };

  const handleImport = async () => {
    const [vaultData, importError] = await window.electron.importVault();

    if (importError) {
      window.electron.sendAlert(importError);
      return;
    }

    if (!isValidItem(vaultData)) {
      window.electron.sendAlert("Vault data is invalid");
      return;
    }

    setVault(sortRecursively(vaultData));
    updateInfo("Vault data imported!");
  };

  return (
    <div className="flex flex-row items-center justify-between p-1 sm:p-2">
      <Header>DCrypt</Header>
      <InfoText className="text-center" message={info} />
      <div className="flex flex-row items-center justify-between gap-1 sm:gap-2">
        <Button action="alternate" type="button" onClick={handleImport}>
          Import Vault
        </Button>
        <Button action="alternate" type="button" onClick={handleExport}>
          Export Vault
        </Button>
        <Button action="alternate" type="button" onClick={handleReset}>
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
