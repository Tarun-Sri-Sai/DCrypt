import Dashboard from "./pages/Dashboard";
import { useState, useEffect } from "react";
import Loading from "./pages/Loading";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setLoadingMessage("");
    }, 5000);
  }, []);

  return isLoading ? (
    <Loading isLoading={isLoading} message={loadingMessage} />
  ) : (
    <Dashboard />
  );
};

export default App;
