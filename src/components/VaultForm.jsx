import React, { useState } from "react";
import { useDcryptContext } from "../contexts/DcryptContext";
import ErrorBox from "./ErrorBox";

const VaultForm = () => {
  const { updateVault, clearVault } = useDcryptContext();
  const [newVault, setNewVault] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const parsedVault = JSON.parse(newVault);
      updateVault(parsedVault);
      setError(null);
    } catch (err) {
      setError("Invalid JSON for vault. Please try again");
      setNewVault("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center bg-gray-50 p-4"
    >
      <div className="mb-2">
        <label htmlFor="vault" className="text-gray-700">
          Enter new vault:{" "}
        </label>
        <input
          id="vault"
          type="text"
          placeholder='{"username": "password"}'
          className="w-64 p-2 border border-gray-300 rounded focus:border-blue-600"
          onChange={(e) => setNewVault(e.target.value)}
          value={newVault}
        />
      </div>

      <div className="mb-2">
        {error !== null && <ErrorBox message={error} />}
      </div>

      <div className="mb-2 flex flex-row gap-4 items-center">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Update vault
        </button>
        <button
          type="button"
          className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
          onClick={() => {
            clearVault();
            setError(null);
          }}
        >
          Clear vault
        </button>
      </div>
    </form>
  );
};

export default VaultForm;
