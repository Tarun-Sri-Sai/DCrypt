const Loader = ({ message }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      {message && <div className="mt-4 text-white text-lg">{message}</div>}
    </div>
  );
};

export default Loader;
