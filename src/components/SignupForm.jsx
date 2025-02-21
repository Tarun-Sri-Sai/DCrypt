import { useState } from "react";
import ErrorBox from "../components/ErrorBox";
import Input from "../components/Input";
import Button from "../components/Button";
import { DIRECTORY_KEY } from "../constants";
import Label from "./Label";

const SignupForm = ({ onSuccess }) => {
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (signupPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    const directory = localStorage.getItem(DIRECTORY_KEY);
    if (!(await window.electron.usePassword(directory, signupPassword))) {
      setError("Password is too short or contains whitespace");
      return;
    }

    setSignupPassword("");
    setConfirmPassword("");
    setError(null);
    onSuccess();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-1 sm:p-2 lg:p-4">
      <Label labelText="Vault location">
        {localStorage.getItem(DIRECTORY_KEY)}
      </Label>
      <form
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col items-center justify-center bg-gray-50 p-1 sm:p-2 lg:p-4"
      >
        <div className="mb-2">
          <Input
            label={"New master password"}
            id={"signupPassword"}
            type="password"
            onChange={(e) => setSignupPassword(e.target.value)}
            value={signupPassword}
          />
        </div>

        <div className="mb-2">
          <Input
            label={"Confirm password"}
            id={"confirmPassword"}
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>

        <div className="mb-2">
          {error !== null && <ErrorBox message={error} />}
        </div>

        <div className="mb-2">
          <Button type="submit">Create vault</Button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
