import React, { useState } from "react";
import ErrorBox from "./ErrorBox";
import { useNavigate } from "react-router-dom";

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
    }

    await window.electron.storePassword(signupPassword);
    setSignupPassword("");
    setConfirmPassword("");
    setError(null);
    navigate("dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4"
    >
      <label htmlFor="signupPassword" className="mb-2 text-gray-700">
        Enter a strong master password:
      </label>
      <input
        id="signupPassword"
        type="password"
        placeholder="********"
        className="mb-4 w-64 p-2 border border-gray-300 rounded"
        onChange={(e) => setSignupPassword(e.target.value)}
        value={signupPassword}
      />

      <label htmlFor="confirmPassword" className="mb-2 text-gray-700">
        Re-enter the master password:
      </label>
      <input
        id="confirmPassword"
        type="password"
        placeholder="********"
        className="mb-4 w-64 p-2 border border-gray-300 rounded"
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
      />

      {error && <ErrorBox message={error} />}

      <div className="mt-4">
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

export default SignupForm;
