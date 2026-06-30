import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <nav className="border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pulseboard</h1>
        <div className="flex gap-4">
          <Link to="/" className="text-sm hover:underline">
            Home
          </Link>
          <Link to="/dashboard" className="text-sm hover:underline">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}
