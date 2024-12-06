import DashboardHeader from "../components/DashboardHeader";
import DashboardContents from "../components/DashboardContents";
import { DashboardProvider } from "../contexts/DashboardProvider";

const Dashboard = () => {
  return (
    <DashboardProvider>
      <div className="h-screen flex flex-col">
        <DashboardHeader />
        <div className="flex-grow">
          <DashboardContents />
        </div>
      </div>
    </DashboardProvider>
  );
};

export default Dashboard;
