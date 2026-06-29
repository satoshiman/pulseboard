import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard } from "@/features/dashboard/ui/Dashboard";
import { AppProvider } from "@/shared/context/AppContext";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: (
      <AppProvider>
        <Dashboard />
      </AppProvider>
    ),
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
