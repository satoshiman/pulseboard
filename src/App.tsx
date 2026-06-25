import { Routes, Route, Link } from "react-router-dom";
import { Dashboard } from "./features/dashboard/ui/Dashboard";
import { Chat } from "./features/chat/ui/Chat";

function App() {
  return (
    <div className="min-h-screen">
      <nav className="border-b p-4 flex gap-4">
        <Link to="/" className="text-blue-600 hover:underline">
          Dashboard
        </Link>
        <Link to="/chat" className="text-blue-600 hover:underline">
          Chat (Anti-Pattern)
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
