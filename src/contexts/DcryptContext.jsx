import { createContext, useContext } from "react";

export const DcryptContext = createContext();
export const useDcryptContext = () => useContext(DcryptContext);
