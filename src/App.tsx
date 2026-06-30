import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Navigation />
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Pulseboard</CardTitle>
              <CardDescription>
                Your AI-powered dashboard for productivity and insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Link to="/dashboard">
                  <Button>Go to Dashboard</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
