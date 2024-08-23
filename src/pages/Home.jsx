import { Navigate } from "react-router-dom";
import { useDcryptContext } from "../contexts/DcryptContext";

const Home = () => {
  const { directory } = useDcryptContext();

  return directory === null ? (
    <Navigate to={"/get-started"} />
  ) : (
    <Navigate to={"/login"} />
  );
};

export default Home;
