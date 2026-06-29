import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard } from "@/features/dashboard/ui/Dashboard";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
