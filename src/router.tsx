import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard } from "@/features/dashboard/ui/Dashboard";
import { MemLeak } from "@/features/memleak/ui/MemLeak";
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
  {
    path: "/memleak",
    element: <MemLeak />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
