import React, { useState } from "react";
import { useDcryptContext } from "../contexts/DcryptContext";
import ErrorBox from "./ErrorBox";
import Input from "./Input";
import Button from "./Button";

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
        <Input
          label={"Enter new vault"}
          id={"vault"}
          type="text"
          placeholder='{"username": "password"}'
          onChange={(e) => setNewVault(e.target.value)}
          value={newVault}
          borderColor={"black"}
        />
      </div>

      <div className="mb-2">
        {error !== null && <ErrorBox message={error} />}
      </div>

      <div className="mb-2 flex flex-row gap-4 items-center">
        <Button
          type="submit"
          color={"blue"}
          message={"Update vault"}
          text={"white"}
        />
        <Button
          type="button"
          message={"Clear vault"}
          onClick={() => {
            clearVault();
            setError(null);
          }}
          color={"orange"}
          text={"white"}
        />
      </div>
    </form>
  );
};

export default VaultForm;
