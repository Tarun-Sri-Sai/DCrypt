import React, { useState } from "react";
import ErrorBox from "./ErrorBox";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";

const SignupForm = () => {
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (signupPassword.length < 8) {
      setError("Password is too short");
      setSignupPassword("");
      setConfirmPassword("");
      return;
    }

    if (signupPassword !== confirmPassword) {
      setError("Passwords don't match");
      setSignupPassword("");
      setConfirmPassword("");
      return;
    }

    await window.electron.storePassword(signupPassword);
    setSignupPassword("");
    setConfirmPassword("");
    setError(null);
    navigate("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4"
    >
      <div className="mb-2">
        <Input
          label={"Enter a strong master password"}
          id={"signupPassword"}
          type="password"
          placeholder="********"
          onChange={(e) => setSignupPassword(e.target.value)}
          value={signupPassword}
          borderColor={"black"}
        />
      </div>

      <div className="mb-2">
        <Input
          label={"Re-enter the master password"}
          id={"confirmPassword"}
          type="password"
          placeholder="********"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          borderColor={"black"}
        />
      </div>

      <div className="mb-2">
        {error !== null && <ErrorBox message={error} />}
      </div>

      <div className="mb-2">
        <Button
          type="submit"
          message={"Create vault"}
          color={"blue"}
          text={"white"}
        />
      </div>
    </form>
  );
};

export default SignupForm;
