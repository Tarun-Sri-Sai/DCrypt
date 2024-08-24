import React, { Suspense, lazy } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Error from "./components/Error";
import Loader from "./components/Loader";
import Layout from "./components/Layout";

const GetStarted = lazy(() => import("./pages/GetStarted"));
const Login = lazy(() => import("./pages/Login"));
const Logout = lazy(() => import("./pages/Logout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Root = lazy(() => import("./pages/Root"));

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error message={"Page Not Found"} />,
    children: [
      { index: true, element: <Root /> },
      { path: "/get-started", element: <GetStarted /> },
      { path: "/login", element: <Login /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/logout", element: <Logout /> },
    ],
  },
]);

const App = () => {
  return (
    <Suspense fallback={<Loader message={"Loading..."} />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
