import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "./Header";
import InfoText from "./InfoText";
import { DIRECTORY_KEY, INFO_TIMEOUT } from "../constants";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState("");

  const updateInfo = (message) => {
    setInfo(message);
    setTimeout(() => setInfo(""), INFO_TIMEOUT);
  };

  const handleReset = () => {
    localStorage.removeItem(DIRECTORY_KEY);
    navigate("/");
  };

  const handleExport = async () => {
    window.electron.sendInfo("Delete the unencrypted export file after use");
    const exportFile = await window.electron.exportVault();

    if (!exportFile) {
      window.electron.sendAlert("Export failed");
      return;
    }

    updateInfo(`Vault has been exported to ${exportFile}`);
  };

  const handleImport = async () => {
    const importResult = await window.electron.importVault();
    if (!importResult) {
      window.electron.sendAlert("Import failed");
      return;
    }

    updateInfo("Vault data imported");
  };

  return (
    <div className="flex flex-row items-center justify-between p-1 sm:p-2">
      <Header>Dashboard</Header>
      <InfoText className="flex w-full text-center" message={info} />
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
      </div>
    </div>
  );
};

export default DashboardHeader;
