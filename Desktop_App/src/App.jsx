import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import Error from "./components/Error";
import Loader from "./components/Loader";
import VaultLocation from "./pages/VaultLocation";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import { DIRECTORY_KEY } from "./constants";

const router = createHashRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <Error message={"Page not found"} />,
    children: [
      {
        index: true,
        element:
          localStorage.getItem(DIRECTORY_KEY) === null ? (
            <VaultLocation />
          ) : (
            <Signup />
          ),
      },
      { path: "/vault-location", element: <VaultLocation /> },
      { path: "/login", element: <Login /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
]);

const App = () => {
  return (
    <RouterProvider
      fallbackElement={<Loader message={"Loading page..."} />}
      router={router}
    />
  );
};

export default App;
