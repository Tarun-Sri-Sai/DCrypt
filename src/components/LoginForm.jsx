import React, { useState } from "react";
import { useDcryptContext } from "../contexts/DcryptContext";
import { useNavigate } from "react-router-dom";
import ErrorBox from "./ErrorBox";

const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { directory, updateVault } = useDcryptContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await window.electron.storePassword(password);
    const electronVault = await window.electron.decryptVault(directory);

    if (electronVault === null) {
      setError("Invalid password. Try again");
      setPassword("");
      return;
    }

    updateVault(electronVault);
    navigate("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4"
    >
      <div className="mb-2">
        <label htmlFor="password" className="text-gray-700">
          Enter the master password:{" "}
        </label>
        <input
          id="password"
          type="password"
          placeholder="********"
          className="w-64 p-2 border border-gray-300 rounded focus:border-blue-600"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <div className="mb-2">
        {error !== null && <ErrorBox message={error} />}
      </div>

      <div className="mb-2">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Go to vault
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
