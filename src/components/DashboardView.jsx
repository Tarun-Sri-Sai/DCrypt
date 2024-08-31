import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import { useDcryptContext } from "../contexts/DcryptContext";

const DashboardView = () => {
  const { vaultProps } = useDcryptContext();

  return (
    <>
      <DashboardHeader />
      <div>Dashboard: {JSON.stringify(vaultProps.vault)}</div>
    </>
  );
};

export default DashboardView;
