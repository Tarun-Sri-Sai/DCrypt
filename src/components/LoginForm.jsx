import React, { useState } from "react";
import { useDcryptContext } from "../contexts/DcryptContext";
import Input from "./Input";
import Button from "./Button";

const LoginForm = ({ onSuccess, children }) => {
  const [passwordInput, setPasswordInput] = useState("");
  const { directory } = useDcryptContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const [hashedPassword, hashingError] = await window.electron.hashPassword(
      passwordInput
    );
    if (hashingError) {
      window.electron.sendAlert(`Unable to hash the password: ${hashingError}`);
      return;
    }

    const [, decryptionError] = await window.electron.decryptVault(
      directory,
      hashedPassword
    );

    if (decryptionError) {
      window.electron.sendAlert("Invalid password. Try again");
      setPasswordInput("");
      return;
    }

    onSuccess(hashedPassword);
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
          placeholder="••••••••••"
          onChange={(e) => setPasswordInput(e.target.value)}
          value={passwordInput}
        />
      </div>

      <div className="mb-2">
        <Button type="submit">{children}</Button>
      </div>
    </form>
  );
};

export default LoginForm;
