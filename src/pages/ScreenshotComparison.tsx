import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye, ZoomIn, ZoomOut, Download, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import baseline from "@/assets/screenshots/user-baseline.png";
import actual from "@/assets/screenshots/user-actual.png";
import diff from "@/assets/screenshots/user-diff.png";

const ScreenshotComparison = () => {
  const { runId, screenId } = useParams();
  const [activeTab, setActiveTab] = useState<"diff" | "baseline" | "actual">("diff");
  const [zoom, setZoom] = useState(100);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [showOverlay, setShowOverlay] = useState(false);

  // Mock data
  const screenshot = {
    name: screenId?.replace(/-/g, ' ') || "login screen",
    similarity: 98.7,
    changes: 3,
    timestamp: "2024-01-15 14:30:00",
    testId: "comp-001"
  };

  // All screenshots use the same images
  const images = { baseline, actual, diff };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to={`/run/${runId}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Visual Comparison</h1>
            <p className="text-muted-foreground mt-1">Pixel-perfect analysis of UI changes</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-success hover:bg-success text-lg px-4 py-2">
            {screenshot.similarity}% Similarity
          </Badge>
          <Badge className="bg-warning hover:bg-warning text-lg px-4 py-2">
            {screenshot.changes} changes detected
          </Badge>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Controls */}
      <Card className="p-4 bg-gradient-card border-0 shadow-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant={activeTab === "diff" ? "default" : "outline"}
              onClick={() => setActiveTab("diff")}
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              Diff
            </Button>
            <Button
              variant={activeTab === "baseline" ? "default" : "outline"}
              onClick={() => setActiveTab("baseline")}
            >
              Baseline
            </Button>
            <Button
              variant={activeTab === "actual" ? "default" : "outline"}
              onClick={() => setActiveTab("actual")}
            >
              Actual
            </Button>
            <div className="h-6 w-px bg-border mx-2" />
            <Button
              variant={showOverlay ? "default" : "outline"}
              onClick={() => setShowOverlay(!showOverlay)}
            >
              <Eye className="w-4 h-4 mr-2" />
              Overlay Compare
            </Button>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" onClick={() => setZoom(Math.max(50, zoom - 10))}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium min-w-[60px] text-center">{zoom}%</span>
            <Button variant="outline" size="icon" onClick={() => setZoom(Math.min(200, zoom + 10))}>
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Comparison View */}
      {!showOverlay ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Diff View */}
          <Card className={`p-6 bg-gradient-card border-0 shadow-card ${activeTab === "diff" ? "lg:col-span-3" : "hidden lg:block"}`}>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg">Difference</h3>
                <p className="text-sm text-muted-foreground">Visual diff highlights</p>
              </div>
              <div className="aspect-[9/16] lg:aspect-[16/9] bg-muted/20 rounded-lg border-2 border-destructive/20 overflow-hidden" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
                <img src={images.diff} alt="Difference map" className="w-full h-full object-contain" />
              </div>
            </div>
          </Card>

          {/* Baseline View */}
          <Card className={`p-6 bg-gradient-card border-0 shadow-card ${activeTab === "baseline" ? "lg:col-span-3" : "hidden lg:block"}`}>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg">Baseline</h3>
                <p className="text-sm text-muted-foreground">Reference screenshot</p>
              </div>
              <div className="aspect-[9/16] lg:aspect-[16/9] bg-muted/20 rounded-lg border-2 border-primary/20 overflow-hidden" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
                <img src={images.baseline} alt="Baseline screenshot" className="w-full h-full object-contain" />
              </div>
            </div>
          </Card>

          {/* Actual View */}
          <Card className={`p-6 bg-gradient-card border-0 shadow-card ${activeTab === "actual" ? "lg:col-span-3" : "hidden lg:block"}`}>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg">Actual</h3>
                <p className="text-sm text-muted-foreground">Current screenshot</p>
              </div>
              <div className="aspect-[9/16] lg:aspect-[16/9] bg-muted/20 rounded-lg border-2 border-warning/20 overflow-hidden" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
                <img src={images.actual} alt="Actual screenshot" className="w-full h-full object-contain" />
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <Card className="p-6 bg-gradient-card border-0 shadow-card">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Overlay Comparison</h3>
                <p className="text-sm text-muted-foreground">Slide to compare baseline (left) vs actual (right)</p>
              </div>
            </div>
            
            <div className="relative aspect-[16/9] bg-muted/20 rounded-lg border-2 border-primary/20 overflow-hidden">
              {/* Baseline (Background) */}
              <div className="absolute inset-0">
                <img src={images.baseline} alt="Baseline" className="w-full h-full object-contain" />
              </div>
              
              {/* Actual (Overlay with clip-path) */}
              <div 
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img src={images.actual} alt="Actual" className="w-full h-full object-contain" />
              </div>
              
              {/* Slider line */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-primary shadow-lg z-10 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full shadow-lg flex items-center justify-center">
                  <div className="w-1 h-4 bg-white rounded-full" />
                </div>
              </div>
            </div>
            
            {/* Slider Control */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium min-w-[80px]">Baseline</span>
              <Slider
                value={[sliderPosition]}
                onValueChange={(value) => setSliderPosition(value[0])}
                min={0}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-sm font-medium min-w-[80px] text-right">Actual</span>
            </div>
          </div>
        </Card>
      )}

      {/* Test Metadata */}
      <Card className="p-6 bg-gradient-card border-0 shadow-card">
        <h3 className="font-bold text-lg mb-4">Test Metadata</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Client</p>
            <p className="font-semibold">BRD Mobile</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Screen</p>
            <p className="font-semibold">{screenshot.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Timestamp</p>
            <p className="font-semibold">{screenshot.timestamp}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Test ID</p>
            <p className="font-semibold">{screenshot.testId}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ScreenshotComparison;
