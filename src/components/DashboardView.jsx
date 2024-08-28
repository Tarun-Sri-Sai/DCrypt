import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import { useDcryptContext } from "../contexts/DcryptContext";

const DashboardView = () => {
  const { vault } = useDcryptContext();

  return (
    <>
      <DashboardHeader />
      <div>Dashboard: {JSON.stringify(vault)}</div>
    </>
  );
};

export default DashboardView;
