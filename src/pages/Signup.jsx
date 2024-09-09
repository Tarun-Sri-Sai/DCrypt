import React from "react";
import SignupForm from "../components/SignupForm";
import { useDcryptContext } from "../contexts/DcryptContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { setPassword } = useDcryptContext();
  const navigate = useNavigate();

  return (
    <SignupForm
      onSuccess={(password) => {
        setPassword(password);
        navigate("/dashboard");
      }}
    >
      Create vault
    </SignupForm>
  );
};

export default Signup;
