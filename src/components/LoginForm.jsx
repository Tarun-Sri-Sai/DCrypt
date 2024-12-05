import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { DIRECTORY_KEY } from "../constants";

const LoginForm = ({ onSuccess, children }) => {
  const [passwordInput, setPasswordInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const directory = localStorage.getItem(DIRECTORY_KEY);
    if (!(await window.electron.usePassword(directory, passwordInput))) {
      window.electron.sendAlert("Invalid password. Try again");
      setPasswordInput("");
      return;
    }

    onSuccess();
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
