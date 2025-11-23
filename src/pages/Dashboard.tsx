import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  TrendingUp,
  Apple,
  Bookmark
} from "lucide-react";

const AndroidIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <circle cx="12" cy="12" r="10" fill="#A4C639"/>
    <path d="M15.6,9.48l1.22-2.12c0.11-0.21,0.03-0.46-0.17-0.57c-0.19-0.1-0.43-0.04-0.55,0.15l-1.25,2.16c-1.91-0.81-4.05-0.81-5.96,0L7.65,6.94c-0.13-0.19-0.39-0.25-0.58-0.13C6.88,6.9,6.83,7.14,6.94,7.33l1.22,2.15c-2.06,1.18-3.48,3.37-3.66,5.9h14.76C19.08,12.85,17.66,10.66,15.6,9.48z M9.5,13.08c-0.46,0-0.83-0.37-0.83-0.83c0-0.46,0.37-0.83,0.83-0.83c0.46,0,0.83,0.37,0.83,0.83C10.33,12.71,9.96,13.08,9.5,13.08z M14.5,13.08c-0.46,0-0.83-0.37-0.83-0.83c0-0.46,0.37-0.83,0.83-0.83s0.83,0.37,0.83,0.83C15.33,12.71,14.96,13.08,14.5,13.08z" fill="white"/>
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <circle cx="12" cy="12" r="10" fill="#999999"/>
    <path d="M16.65,12.5c-0.02-2.03,1.66-3.01,1.73-3.06c-0.94-1.38-2.41-1.57-2.93-1.59c-1.25-0.13-2.43,0.73-3.06,0.73c-0.63,0-1.61-0.71-2.65-0.69c-1.36,0.02-2.62,0.79-3.32,2.01c-1.41,2.45-0.36,6.08,1.02,8.07c0.67,0.97,1.47,2.07,2.52,2.03c1.02-0.04,1.41-0.66,2.64-0.66c1.23,0,1.59,0.66,2.65,0.64c1.09-0.02,1.79-0.99,2.46-1.96c0.78-1.13,1.1-2.22,1.12-2.28C17.76,15.71,16.67,15.25,16.65,12.5z M14.74,7.3c0.56-0.68,0.94-1.61,0.83-2.55c-0.81,0.03-1.78,0.54-2.36,1.21c-0.52,0.6-0.97,1.56-0.85,2.48C13.26,8.48,14.17,7.98,14.74,7.3z" fill="white"/>
  </svg>
);

const Dashboard = () => {
  const apps = [
    { id: 1, name: "KH Demo", platform: "Android", lastRun: "3 hours ago", status: "changes", changes: 5, baselines: 0 },
    { id: 2, name: "BRD Demo", platform: "Android", lastRun: "1 day ago", status: "pending", changes: 0, baselines: 0 },
    { id: 3, name: "White Label", platform: "Android", lastRun: "6 hours ago", status: "changes", changes: 3, baselines: 2 },
    { id: 4, name: "MMB Demo", platform: "Android", lastRun: "45 min ago", status: "success", changes: 0, baselines: 1 },
    { id: 5, name: "KH Demo", platform: "iOS", lastRun: "2 hours ago", status: "success", changes: 0, baselines: 3 },
    { id: 6, name: "BRD Demo", platform: "iOS", lastRun: "1 day ago", status: "success", changes: 0, baselines: 0 },
    { id: 7, name: "White Label", platform: "iOS", lastRun: "5 hours ago", status: "success", changes: 0, baselines: 1 },
    { id: 8, name: "MMB Demo", platform: "iOS", lastRun: "30 min ago", status: "success", changes: 0, baselines: 0 },
  ];

  const recentRuns = [
    { id: 1, app: "KH Demo", platform: "Android", time: "3 hours ago", status: "changes", changes: 5, baselines: 0 },
    { id: 2, app: "KH Demo", platform: "iOS", time: "2 hours ago", status: "success", changes: 0, baselines: 3 },
    { id: 3, app: "BRD Demo", platform: "Android", time: "1 day ago", status: "pending", changes: 0, baselines: 0 },
    { id: 4, app: "BRD Demo", platform: "iOS", time: "1 day ago", status: "success", changes: 0, baselines: 0 },
    { id: 5, app: "White Label", platform: "Android", time: "6 hours ago", status: "changes", changes: 3, baselines: 2 },
    { id: 6, app: "White Label", platform: "iOS", time: "5 hours ago", status: "success", changes: 0, baselines: 1 },
    { id: 7, app: "MMB Demo", platform: "Android", time: "45 min ago", status: "success", changes: 0, baselines: 1 },
    { id: 8, app: "MMB Demo", platform: "iOS", time: "30 min ago", status: "success", changes: 0, baselines: 0 },
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

  const getPlatformIcon = (platform: string) => {
    if (platform === "iOS") {
      return <AppleIcon />;
    }
    return <AndroidIcon />;
  };

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Link to="/applications">
          <Card className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-glow transition-all cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Apps</p>
                <p className="text-3xl font-bold mt-1">{apps.length}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>
        </Link>
        <Link to="/history" state={{ filterStatus: "success" }}>
          <Card className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-glow transition-all cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Successful Runs</p>
                <p className="text-3xl font-bold mt-1">6</p>
              </div>
              <div className="p-3 bg-success/10 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-success" />
              </div>
            </div>
          </Card>
        </Link>
        <Link to="/history" state={{ filterStatus: "changes" }}>
          <Card className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-glow transition-all cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Changes Detected</p>
                <p className="text-3xl font-bold mt-1">2</p>
              </div>
              <div className="p-3 bg-warning/10 rounded-lg">
                <AlertCircle className="w-6 h-6 text-warning" />
              </div>
            </div>
          </Card>
        </Link>
        <Link to="/history" state={{ filterStatus: "failed" }}>
          <Card className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-glow transition-all cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Failed Tests</p>
                <p className="text-3xl font-bold mt-1">0</p>
              </div>
              <div className="p-3 bg-destructive/10 rounded-lg">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </Card>
        </Link>
        <Link to="/history">
          <Card className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-glow transition-all cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Changes</p>
                <p className="text-3xl font-bold mt-1">8</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>
        </Link>
        </div>
      </div>

      {/* Applications Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Your Applications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {apps.map((app) => (
            <Link 
              key={app.id} 
              to={`/app/${app.name.toLowerCase().replace(/\s+/g, '-')}-${app.platform.toLowerCase()}`}
            >
              <Card className="p-6 hover:shadow-glow transition-all cursor-pointer bg-gradient-card border-0 shadow-card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {getPlatformIcon(app.platform)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{app.name}</h3>
                      <Badge variant="outline" className="mt-1">{app.platform}</Badge>
                    </div>
                  </div>
                  {getStatusIcon(app.status)}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Last run:</span>
                    <span className="font-medium">{app.lastRun}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {getStatusBadge(app.status, app.changes)}
                    {app.baselines > 0 && (
                      <Badge variant="outline" className="border-primary text-primary">
                        <Bookmark className="w-3 h-3 mr-1" />
                        {app.baselines} Baseline{app.baselines > 1 ? 's' : ''}
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Runs */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Recent Runs</h2>
        <Card className="bg-gradient-card border-0 shadow-card">
          <div className="divide-y divide-border">
            {recentRuns.map((run) => (
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
                        <h3 className="font-semibold">{run.app}</h3>
                        <p className="text-sm text-muted-foreground">{run.platform}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground">{run.time}</span>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(run.status, run.changes)}
                        {run.baselines > 0 && (
                          <Badge variant="outline" className="border-primary text-primary">
                            <Bookmark className="w-3 h-3 mr-1" />
                            {run.baselines}
                          </Badge>
                        )}
                      </div>
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

export default Dashboard;
