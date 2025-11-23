import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Palette, Moon, Sun, Monitor, Droplet, Leaf, Sunrise } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/hooks/use-theme";

const Appearance = () => {
  const { theme, setTheme, accentColor, setAccentColor } = useTheme();

  const handleSave = () => {
    toast.success("Appearance settings saved");
  };

  const accentColors = [
    { name: "Purple", color: "263 70% 50%" },
    { name: "Blue", color: "217 91% 60%" },
    { name: "Green", color: "142 76% 36%" },
    { name: "Orange", color: "38 92% 50%" },
    { name: "Red", color: "0 84% 60%" },
    { name: "Pink", color: "330 81% 60%" },
    { name: "Teal", color: "180 65% 50%" },
    { name: "Yellow", color: "48 96% 53%" },
  ];

  const themes = [
    { value: "light", label: "Light", icon: Sun, description: "Bright and clear" },
    { value: "dark", label: "Dark", icon: Moon, description: "Easy on the eyes" },
    { value: "system", label: "System", icon: Monitor, description: "Match device" },
    { value: "blue", label: "Blue", icon: Droplet, description: "Cool and calm" },
    { value: "green", label: "Green", icon: Leaf, description: "Fresh and natural" },
    { value: "sunset", label: "Sunset", icon: Sunrise, description: "Warm and vibrant" },
    { value: "ocean", label: "Ocean", icon: Palette, description: "Deep sea vibes" },
  ] as const;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Appearance</h1>
        <p className="text-muted-foreground mt-1">
          Customize how Pixel Buddy looks on your device
        </p>
      </div>

      {/* Theme Settings */}
      <Card className="p-6 bg-gradient-card border-0 shadow-card">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-1">Theme</h3>
            <p className="text-sm text-muted-foreground">
              Select your preferred color theme
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon;
              const isActive = theme === themeOption.value;
              return (
                <Card
                  key={themeOption.value}
                  className={`p-4 cursor-pointer hover:border-primary transition-colors border-2 ${
                    isActive ? "border-primary" : ""
                  }`}
                  onClick={() => setTheme(themeOption.value as any)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{themeOption.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {themeOption.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Accent Color */}
      <Card className="p-6 bg-gradient-card border-0 shadow-card">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-1">Accent Color</h3>
            <p className="text-sm text-muted-foreground">
              Choose your preferred accent color
            </p>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {accentColors.map((color) => {
              const isActive = accentColor === color.color;
              return (
                <div
                  key={color.name}
                  className={`w-12 h-12 rounded-lg cursor-pointer border-2 transition-all hover:scale-110 ${
                    isActive ? "border-foreground ring-2 ring-offset-2 ring-foreground" : "border-transparent"
                  }`}
                  style={{ backgroundColor: `hsl(${color.color})` }}
                  title={color.name}
                  onClick={() => setAccentColor(color.color)}
                />
              );
            })}
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-gradient-primary hover:opacity-90 shadow-glow"
        >
          <Palette className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Appearance;
