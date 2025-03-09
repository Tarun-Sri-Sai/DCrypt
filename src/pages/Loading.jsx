import { RotatingLines } from "react-loader-spinner";

const Loading = ({ isLoading, message = "Loading..." }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
        <RotatingLines visible={isLoading} strokeColor="blue" width={50} />
      <div className="font-bold">{message}</div>
    </div>
  );
};

export default Loading;
