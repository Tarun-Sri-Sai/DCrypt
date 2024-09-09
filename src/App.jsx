import React, { Suspense, lazy } from "react";
import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import Error from "./components/Error";
import Loader from "./components/Loader";
import { DcryptProvider } from "./contexts/DcryptContext";

const VaultLocation = lazy(() => import("./pages/VaultLocation"));
const Login = lazy(() => import("./pages/Login"));
const Logout = lazy(() => import("./pages/Logout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Root = lazy(() => import("./pages/Root"));
const Signup = lazy(() => import("./pages/Signup"));

const router = createHashRouter([
  {
    path: "/",
    element: <Outlet className="font-serif" />,
    errorElement: <Error message={"Page not found"} />,
    children: [
      { index: true, element: <Root /> },
      { path: "/vault-location", element: <VaultLocation /> },
      { path: "/login", element: <Login /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/logout", element: <Logout /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
]);

const App = () => {
  return (
    <DcryptProvider>
      <Suspense fallback={<Loader message={"Loading page..."} />}>
        <RouterProvider router={router} />
      </Suspense>
    </DcryptProvider>
  );
};

export default App;
