import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import App from "./App";

// Route-level code splitting - each route loads only when navigated to
const Dashboard = lazy(() =>
  import("@/features/dashboard/ui/Dashboard").then((m) => ({
    default: m.Dashboard,
  })),
);

// Skeleton component for loading states
function RouteSkeleton() {
  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
        <div className="h-32 w-full bg-muted animate-pulse rounded" />
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<RouteSkeleton />}>
        <Dashboard />
      </Suspense>
    ),
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
