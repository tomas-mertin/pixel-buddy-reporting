import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const AndroidIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <circle cx="12" cy="12" r="10" fill="#A4C639"/>
    <path d="M15.6,9.48l1.22-2.12c0.11-0.21,0.03-0.46-0.17-0.57c-0.19-0.1-0.43-0.04-0.55,0.15l-1.25,2.16c-1.91-0.81-4.05-0.81-5.96,0L7.65,6.94c-0.13-0.19-0.39-0.25-0.58-0.13C6.88,6.9,6.83,7.14,6.94,7.33l1.22,2.15c-2.06,1.18-3.48,3.37-3.66,5.9h14.76C19.08,12.85,17.66,10.66,15.6,9.48z M9.5,13.08c-0.46,0-0.83-0.37-0.83-0.83c0-0.46,0.37-0.83,0.83-0.83c0.46,0,0.83,0.37,0.83,0.83C10.33,12.71,9.96,13.08,9.5,13.08z M14.5,13.08c-0.46,0-0.83-0.37-0.83-0.83c0-0.46,0.37-0.83,0.83-0.83s0.83,0.37,0.83,0.83C15.33,12.71,14.96,13.08,14.5,13.08z" fill="white"/>
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <circle cx="12" cy="12" r="10" fill="#999999"/>
    <path d="M16.65,12.5c-0.02-2.03,1.66-3.01,1.73-3.06c-0.94-1.38-2.41-1.57-2.93-1.59c-1.25-0.13-2.43,0.73-3.06,0.73c-0.63,0-1.61-0.71-2.65-0.69c-1.36,0.02-2.62,0.79-3.32,2.01c-1.41,2.45-0.36,6.08,1.02,8.07c0.67,0.97,1.47,2.07,2.52,2.03c1.02-0.04,1.41-0.66,2.64-0.66c1.23,0,1.59,0.66,2.65,0.64c1.09-0.02,1.79-0.99,2.46-1.96c0.78-1.13,1.1-2.22,1.12-2.28C17.76,15.71,16.67,15.25,16.65,12.5z M14.74,7.3c0.56-0.68,0.94-1.61,0.83-2.55c-0.81,0.03-1.78,0.54-2.36,1.21c-0.52,0.6-0.97,1.56-0.85,2.48C13.26,8.48,14.17,7.98,14.74,7.3z" fill="white"/>
  </svg>
);

const Applications = () => {
  const [apps, setApps] = useState([
    { id: 1, name: "KH Demo", platform: "Android", bundleId: "com.kb.khdemo", device: "Pixel 7", scripts: ["Login Flow", "Dashboard"] },
    { id: 2, name: "KH Demo", platform: "iOS", bundleId: "com.kb.khdemo", device: "iPhone 14 Pro", scripts: ["Login Flow", "Dashboard"] },
    { id: 3, name: "BRD Demo", platform: "Android", bundleId: "com.brd.demo", device: "Samsung S23", scripts: ["Transfer Money", "Account View"] },
    { id: 4, name: "BRD Demo", platform: "iOS", bundleId: "com.brd.demo", device: "iPhone 13", scripts: ["Transfer Money", "Account View"] },
    { id: 5, name: "White Label", platform: "Android", bundleId: "com.whitelabel.app", device: "Pixel 6", scripts: ["Offers", "Maps", "Reports"] },
    { id: 6, name: "White Label", platform: "iOS", bundleId: "com.whitelabel.app", device: "iPhone 14", scripts: ["Offers", "Maps", "Reports"] },
    { id: 7, name: "MMB Demo", platform: "Android", bundleId: "com.mmb.demo", device: "OnePlus 10", scripts: ["Login", "Settings"] },
    { id: 8, name: "MMB Demo", platform: "iOS", bundleId: "com.mmb.demo", device: "iPhone 14 Pro", scripts: ["Login", "Settings"] },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newApp, setNewApp] = useState({
    name: "",
    platform: "",
    bundleId: "",
    device: "",
  });

  const handleAddApp = () => {
    if (!newApp.name || !newApp.platform || !newApp.bundleId || !newApp.device) {
      toast.error("Please fill in all fields");
      return;
    }

    const app = {
      id: apps.length + 1,
      ...newApp,
      scripts: [],
    };

    setApps([...apps, app]);
    setIsAddDialogOpen(false);
    setNewApp({ name: "", platform: "", bundleId: "", device: "" });
    toast.success("Application added successfully");
  };


  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Applications</h1>
          <p className="text-muted-foreground mt-1">Manage your mobile applications and test configurations</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90 shadow-glow">
              <Plus className="w-4 h-4 mr-2" />
              Add Application
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Application</DialogTitle>
              <DialogDescription>
                Configure a new mobile application for visual testing
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Application Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Shopping App"
                  value={newApp.name}
                  onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Select
                  value={newApp.platform}
                  onValueChange={(value) => setNewApp({ ...newApp, platform: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iOS">iOS</SelectItem>
                    <SelectItem value="Android">Android</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bundleId">Bundle ID / Package Name</Label>
                <Input
                  id="bundleId"
                  placeholder="com.example.app"
                  value={newApp.bundleId}
                  onChange={(e) => setNewApp({ ...newApp, bundleId: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="device">Device / Emulator</Label>
                <Input
                  id="device"
                  placeholder="iPhone 14 Pro / Pixel 7"
                  value={newApp.device}
                  onChange={(e) => setNewApp({ ...newApp, device: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddApp} className="bg-gradient-primary hover:opacity-90">
                Add Application
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Applications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {apps.map((app) => (
          <Card key={app.id} className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-glow transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  {app.platform === "iOS" ? <AppleIcon /> : <AndroidIcon />}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{app.name}</h3>
                  <Badge variant="outline" className="mt-1">{app.platform}</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Bundle ID:</span>
                <span className="font-mono font-medium">{app.bundleId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Device:</span>
                <span className="font-medium">{app.device}</span>
              </div>
              <div className="pt-3 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Test Scripts:</p>
                <div className="flex flex-wrap gap-2">
                  {app.scripts.length > 0 ? (
                    app.scripts.map((script, index) => (
                      <Badge key={index} variant="secondary">
                        {script}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground italic">No scripts configured</span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Applications;
