import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, TrendingUp } from "lucide-react";

const Reports = () => {
  const reports = [
    {
      id: 1,
      name: "Weekly Summary Report",
      date: "2024-10-01 to 2024-10-07",
      type: "Summary",
      runs: 45,
      changes: 12,
    },
    {
      id: 2,
      name: "Monthly Baseline Report",
      date: "September 2024",
      type: "Baseline",
      runs: 180,
      changes: 38,
    },
    {
      id: 3,
      name: "Daily Test Report",
      date: "2024-10-07",
      type: "Daily",
      runs: 8,
      changes: 2,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground mt-1">
            Generate and download test reports
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 shadow-glow">
          <FileText className="w-4 h-4 mr-2" />
          Generate New Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-card border-0 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Reports</p>
              <p className="text-3xl font-bold mt-1">{reports.length}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <FileText className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-0 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-3xl font-bold mt-1">
                {reports.reduce((acc, r) => acc + r.runs, 0)}
              </p>
            </div>
            <div className="p-3 bg-success/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-0 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Changes Found</p>
              <p className="text-3xl font-bold mt-1">
                {reports.reduce((acc, r) => acc + r.changes, 0)}
              </p>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-warning" />
            </div>
          </div>
        </Card>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report) => (
          <Card
            key={report.id}
            className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-glow transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{report.name}</h3>
                  <div className="flex items-center space-x-3 mt-1">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {report.date}
                    </div>
                    <Badge variant="outline">{report.type}</Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Runs</p>
                  <p className="text-lg font-semibold">{report.runs}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Changes</p>
                  <p className="text-lg font-semibold text-warning">
                    {report.changes}
                  </p>
                </div>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reports;
