import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Clock, ArrowLeft } from "lucide-react";

const ApplicationDetail = () => {
  const { appId } = useParams();
  
  // Mock data - in production this would come from an API
  const appName = appId?.includes("android") ? "KH Demo - Android" : "KH Demo - iOS";
  const platform = appId?.includes("android") ? "Android" : "iOS";
  
  const runs = [
    { id: 1, timestamp: "2024-01-15 14:30:00", status: "changes", changes: 5, screens: 12 },
    { id: 2, timestamp: "2024-01-14 10:15:00", status: "success", changes: 0, screens: 12 },
    { id: 3, timestamp: "2024-01-13 16:45:00", status: "changes", changes: 3, screens: 12 },
    { id: 4, timestamp: "2024-01-12 09:20:00", status: "success", changes: 0, screens: 12 },
    { id: 5, timestamp: "2024-01-11 11:30:00", status: "pending", changes: 0, screens: 12 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case "changes":
        return <AlertCircle className="w-5 h-5 text-warning" />;
      case "pending":
        return <Clock className="w-5 h-5 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string, changes: number) => {
    if (status === "success") {
      return <Badge className="bg-success hover:bg-success">No Changes</Badge>;
    }
    if (status === "changes") {
      return <Badge className="bg-warning hover:bg-warning">{changes} Changes</Badge>;
    }
    return <Badge variant="outline">Pending</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{appName}</h1>
            <p className="text-muted-foreground mt-1">Platform: {platform}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Run History</h2>
        <Card className="bg-gradient-card border-0 shadow-card">
          <div className="divide-y divide-border">
            {runs.map((run) => (
              <Link 
                key={run.id} 
                to={`/run/${run.id}`}
                className="block"
              >
                <div className="p-6 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(run.status)}
                      <div>
                        <h3 className="font-semibold">Run #{run.id}</h3>
                        <p className="text-sm text-muted-foreground">{run.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{run.screens} screenshots</p>
                      </div>
                      {getStatusBadge(run.status, run.changes)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationDetail;
