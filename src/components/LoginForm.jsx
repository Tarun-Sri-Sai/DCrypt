import React, { useState } from "react";
import { useDcryptContext } from "../contexts/DcryptContext";
import { useNavigate } from "react-router-dom";
import ErrorBox from "./ErrorBox";
import Input from "./Input";
import Button from "./Button";

const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { windowProps, vaultProps } = useDcryptContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await window.electron.storePassword(password);
    const electronVault = await window.electron.decryptVault(windowProps.directory);

    if (electronVault === null) {
      setError("Invalid password. Try again");
      setPassword("");
      return;
    }

    vaultProps.setVault(electronVault);
    navigate("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4"
    >
      <div className="mb-2">
        <Input
          id="password"
          label={"Enter the master password"}
          type="password"
          placeholder="********"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <div className="mb-2">
        {error !== null && <ErrorBox message={error} />}
      </div>

      <div className="mb-2">
        <Button type="submit">Go to vault</Button>
      </div>
    </form>
  );
};

export default LoginForm;
