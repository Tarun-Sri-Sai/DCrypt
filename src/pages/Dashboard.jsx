import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkPassword = async () => {
      const password = await window.electron.checkPassword();
      if (password === null) {
        navigate("home");
      }

      setIsLoading(false);
    };

    checkPassword();
  });

  return (
    <>
      {isLoading ? (
        <Loader message={"Checking for password, please wait"} />
      ) : (
        <div>Dashboard</div>
      )}
    </>
  );
};

export default Dashboard;
