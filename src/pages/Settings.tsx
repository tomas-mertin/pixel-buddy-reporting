import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const Settings = () => {
  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure your Pixel Buddy preferences</p>
      </div>

      {/* Codemagic Integration */}
      <Card className="p-6 bg-gradient-card border-0 shadow-card">
        <h2 className="text-xl font-bold mb-4">Codemagic Integration</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook">Webhook URL</Label>
            <Input
              id="webhook"
              placeholder="https://your-pixel-buddy-instance.com/webhook"
              defaultValue="https://pixel-buddy.example.com/api/webhook"
            />
            <p className="text-sm text-muted-foreground">
              Use this webhook URL in your Codemagic build configuration
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your Codemagic API key"
            />
          </div>
        </div>
      </Card>

      {/* Appium Configuration */}
      <Card className="p-6 bg-gradient-card border-0 shadow-card">
        <h2 className="text-xl font-bold mb-4">Appium Configuration</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="appiumServer">Appium Server URL</Label>
            <Input
              id="appiumServer"
              placeholder="http://localhost:4723"
              defaultValue="http://localhost:4723"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeout">Default Timeout (seconds)</Label>
            <Input
              id="timeout"
              type="number"
              defaultValue="30"
            />
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6 bg-gradient-card border-0 shadow-card">
        <h2 className="text-xl font-bold mb-4">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email alerts when changes are detected
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Slack Integration</Label>
              <p className="text-sm text-muted-foreground">
                Send notifications to Slack channel
              </p>
            </div>
            <Switch />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slackWebhook">Slack Webhook URL</Label>
            <Input
              id="slackWebhook"
              placeholder="https://hooks.slack.com/services/..."
            />
          </div>
        </div>
      </Card>

      {/* Comparison Settings */}
      <Card className="p-6 bg-gradient-card border-0 shadow-card">
        <h2 className="text-xl font-bold mb-4">Comparison Settings</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="threshold">Difference Threshold (%)</Label>
            <Input
              id="threshold"
              type="number"
              defaultValue="1"
              min="0"
              max="100"
            />
            <p className="text-sm text-muted-foreground">
              Minimum percentage of pixel difference to consider as a change
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Ignore Anti-Aliasing</Label>
              <p className="text-sm text-muted-foreground">
                Ignore minor anti-aliasing differences
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Authentication */}
      <Card className="p-6 bg-gradient-card border-0 shadow-card">
        <h2 className="text-xl font-bold mb-4">Authentication (Coming Soon)</h2>
        <div className="space-y-4 opacity-50">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Require login to access Pixel Buddy
              </p>
            </div>
            <Switch disabled />
          </div>
          <p className="text-sm text-muted-foreground">
            Authentication features will be available in a future update
          </p>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave}
          className="bg-gradient-primary hover:opacity-90 shadow-glow"
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;
