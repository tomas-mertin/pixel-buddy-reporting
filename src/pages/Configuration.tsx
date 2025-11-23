import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings, Save } from "lucide-react";
import { toast } from "sonner";

const Configuration = () => {
  const handleSave = () => {
    toast.success("Configuration saved successfully");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Configuration</h1>
        <p className="text-muted-foreground mt-1">
          Configure test execution and comparison settings
        </p>
      </div>

      {/* Test Execution */}
      <Card className="p-6 bg-gradient-card border-0 shadow-card">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-1">Test Execution</h3>
            <p className="text-sm text-muted-foreground">
              Control how tests are executed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Default Timeout (seconds)</Label>
              <Input type="number" defaultValue="30" />
            </div>

            <div className="space-y-2">
              <Label>Screenshot Delay (ms)</Label>
              <Input type="number" defaultValue="500" />
            </div>

            <div className="space-y-2">
              <Label>Retry Failed Tests</Label>
              <Select defaultValue="2">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="0">Never</SelectItem>
                  <SelectItem value="1">1 time</SelectItem>
                  <SelectItem value="2">2 times</SelectItem>
                  <SelectItem value="3">3 times</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Parallel Execution</Label>
              <Select defaultValue="4">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="1">1 device</SelectItem>
                  <SelectItem value="2">2 devices</SelectItem>
                  <SelectItem value="4">4 devices</SelectItem>
                  <SelectItem value="8">8 devices</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-run on Code Changes</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically execute tests when code is updated
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Stop on First Failure</Label>
                <p className="text-sm text-muted-foreground">
                  Halt execution when a test fails
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
      </Card>

      {/* Comparison Settings */}
      <Card className="p-6 bg-gradient-card border-0 shadow-card">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-1">Comparison Settings</h3>
            <p className="text-sm text-muted-foreground">
              Configure how screenshots are compared
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Similarity Threshold (%)</Label>
              <Input type="number" defaultValue="95" min="0" max="100" />
              <p className="text-xs text-muted-foreground">
                Images above this threshold are considered identical
              </p>
            </div>

            <div className="space-y-2">
              <Label>Pixel Tolerance</Label>
              <Input type="number" defaultValue="5" min="0" max="255" />
              <p className="text-xs text-muted-foreground">
                Maximum color difference per pixel (0-255)
              </p>
            </div>

            <div className="space-y-2">
              <Label>Comparison Algorithm</Label>
              <Select defaultValue="pixelmatch">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="pixelmatch">Pixel Match</SelectItem>
                  <SelectItem value="ssim">SSIM</SelectItem>
                  <SelectItem value="psnr">PSNR</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Ignore Regions</Label>
              <Select defaultValue="none">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="dynamic">Dynamic Content</SelectItem>
                  <SelectItem value="custom">Custom Regions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Anti-Aliasing Detection</Label>
                <p className="text-sm text-muted-foreground">
                  Ignore minor anti-aliasing differences
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Ignore Colors</Label>
                <p className="text-sm text-muted-foreground">
                  Compare only structure, not colors
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Highlight Changes</Label>
                <p className="text-sm text-muted-foreground">
                  Show visual markers on changed areas
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </Card>

      {/* Baseline Management */}
      <Card className="p-6 bg-gradient-card border-0 shadow-card">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-1">Baseline Management</h3>
            <p className="text-sm text-muted-foreground">
              Configure baseline behavior
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-Update Baseline</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically update baseline on successful runs
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Baseline Versioning</Label>
                <p className="text-sm text-muted-foreground">
                  Keep history of previous baselines
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-2">
              <Label>Max Baseline History</Label>
              <Select defaultValue="10">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="5">5 versions</SelectItem>
                  <SelectItem value="10">10 versions</SelectItem>
                  <SelectItem value="20">20 versions</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6 bg-gradient-card border-0 shadow-card">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-1">Notifications</h3>
            <p className="text-sm text-muted-foreground">
              Configure when to receive notifications
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>On Test Completion</Label>
                <p className="text-sm text-muted-foreground">
                  Notify when test run finishes
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>On Changes Detected</Label>
                <p className="text-sm text-muted-foreground">
                  Notify when visual changes are found
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>On Failures</Label>
                <p className="text-sm text-muted-foreground">
                  Notify when tests fail
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-gradient-primary hover:opacity-90 shadow-glow"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Configuration
        </Button>
      </div>
    </div>
  );
};

export default Configuration;
