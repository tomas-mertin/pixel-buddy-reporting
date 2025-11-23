import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Eye,
  Search,
  Filter
} from "lucide-react";

const RunHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    if (location.state?.filterStatus) {
      setFilterStatus(location.state.filterStatus);
    }
  }, [location.state]);

  const runs = [
    { id: 1, app: "Shopping App", platform: "iOS", time: "2024-10-07 14:30", duration: "2m 34s", status: "success", changes: 0, baseline: false },
    { id: 2, app: "Shopping App", platform: "Android", time: "2024-10-07 13:45", duration: "2m 51s", status: "changes", changes: 5, baseline: false },
    { id: 3, app: "Banking App", platform: "iOS", time: "2024-10-06 16:20", duration: "3m 12s", status: "success", changes: 0, baseline: true },
    { id: 4, app: "Banking App", platform: "Android", time: "2024-10-06 16:15", duration: "3m 05s", status: "pending", changes: 0, baseline: false },
    { id: 5, app: "Fitness App", platform: "iOS", time: "2024-10-07 11:10", duration: "1m 58s", status: "success", changes: 0, baseline: false },
    { id: 6, app: "Fitness App", platform: "Android", time: "2024-10-07 10:30", duration: "2m 15s", status: "changes", changes: 3, baseline: false },
    { id: 7, app: "Social App", platform: "iOS", time: "2024-10-07 15:45", duration: "2m 42s", status: "success", changes: 0, baseline: false },
    { id: 8, app: "Social App", platform: "Android", time: "2024-10-07 15:30", duration: "2m 38s", status: "success", changes: 0, baseline: false },
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

  const filteredRuns = runs.filter(run => {
    const matchesSearch = run.app.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         run.platform.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || run.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Run History</h1>
        <p className="text-muted-foreground mt-1">View and compare all test runs</p>
      </div>

      {/* Filters */}
      <Card className="p-6 bg-gradient-card border-0 shadow-card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by app name or platform..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-48">
              <div className="flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="changes">Changes</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Runs Table */}
      <Card className="bg-gradient-card border-0 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Application</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Platform</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Duration</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Result</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Tags</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredRuns.map((run) => (
                <tr key={run.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    {getStatusIcon(run.status)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium">{run.app}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline">{run.platform}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {run.time}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {run.duration}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(run.status, run.changes)}
                  </td>
                  <td className="px-6 py-4">
                    {run.baseline && (
                      <Badge className="bg-primary hover:bg-primary">New Baseline</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/run/${run.id}`)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default RunHistory;
