const ErrorText = ({ message }) => {
  return <>{message && <div className="text-red-500">{message}</div>}</>;
};

export default ErrorText;
