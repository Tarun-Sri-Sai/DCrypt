import DashboardHeader from "../components/DashboardHeader";
import DashboardContents from "../components/DashboardContents";
import { DashboardProvider } from "../contexts/DashboardProvider";

const Dashboard = () => {
  return (
    <DashboardProvider>
      <DashboardHeader />
      <DashboardContents />
    </DashboardProvider>
  );
};

export default Dashboard;
