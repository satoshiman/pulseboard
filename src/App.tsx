import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Dashboard } from "@/features/dashboard/ui/Dashboard";
import ProductDashboard from "@/features/practice/ui/Practice";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <nav className="border-b p-4 flex gap-4">
          <Link to="/" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/practice" className="hover:underline">
            Practice
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/practice" element={<ProductDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
