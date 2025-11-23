import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft,
  Bookmark,
  Download,
  XCircle,
  AlertTriangle,
  Info
} from "lucide-react";
import { toast } from "sonner";
import baseline from "@/assets/screenshots/user-baseline.png";
import actual from "@/assets/screenshots/user-actual.png";
import diff from "@/assets/screenshots/user-diff.png";

const RunDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [screenshotViewModes, setScreenshotViewModes] = useState<Record<number, "grid" | "overlay">>({});
  const [overlayOpacity, setOverlayOpacity] = useState<Record<number, number>>({});

  // Mock data
  const run = {
    id: id,
    app: "Shopping App",
    platform: "Android",
    time: "2024-10-07 13:45",
    duration: "2m 51s",
    status: "changes",
    changes: 5,
    baseline: false,
  };

  type ChangeLevel = "no-changes" | "low-changes" | "high-changes" | "review-needed";
  
  const screenshots = [
    { id: 1, screen: "Login Screen", hasChanges: true, hasBaseline: false, changeLevel: "high-changes" as ChangeLevel, baseline, actual, diff },
    { id: 2, screen: "Dashboard", hasChanges: true, hasBaseline: true, changeLevel: "low-changes" as ChangeLevel, baseline, actual, diff },
    { id: 3, screen: "Offer", hasChanges: true, hasBaseline: false, changeLevel: "review-needed" as ChangeLevel, baseline, actual, diff },
    { id: 4, screen: "Shops", hasChanges: false, hasBaseline: false, changeLevel: "no-changes" as ChangeLevel, baseline, actual, diff },
    { id: 5, screen: "Maps", hasChanges: true, hasBaseline: false, changeLevel: "high-changes" as ChangeLevel, baseline, actual, diff },
    { id: 6, screen: "Reports", hasChanges: true, hasBaseline: false, changeLevel: "low-changes" as ChangeLevel, baseline, actual, diff },
  ];

  const getChangeLevelInfo = (level: ChangeLevel) => {
    switch (level) {
      case "no-changes":
        return { label: "No Changes", icon: CheckCircle2, variant: "success" as const };
      case "low-changes":
        return { label: "Low Changes", icon: Info, variant: "default" as const };
      case "high-changes":
        return { label: "High Changes", icon: AlertCircle, variant: "warning" as const };
      case "review-needed":
        return { label: "Review Needed", icon: AlertTriangle, variant: "destructive" as const };
    }
  };

  const handleSetScreenshotBaseline = (screenName: string) => {
    toast.success(`Baseline updated for ${screenName}`);
  };

  const handleSetBaseline = () => {
    toast.success("Baseline updated successfully");
  };

  const handleMarkAsFailed = () => {
    toast.error("Test run marked as failed");
  };

  const toggleViewMode = (screenshotId: number) => {
    setScreenshotViewModes(prev => ({
      ...prev,
      [screenshotId]: prev[screenshotId] === "overlay" ? "grid" : "overlay"
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/history")}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{run.app}</h1>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="outline">{run.platform}</Badge>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{run.time}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{run.duration}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button 
            onClick={handleSetBaseline}
            className="bg-gradient-primary hover:opacity-90 shadow-glow"
          >
            <Bookmark className="w-4 h-4 mr-2" />
            Set as New Baseline
          </Button>
          <Button 
            onClick={handleMarkAsFailed}
            variant="outline"
            className="border-destructive text-destructive hover:bg-destructive hover:text-white"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Wrong Test
          </Button>
        </div>
      </div>

      {/* Summary */}
      <Card className="p-6 bg-gradient-card border-0 shadow-card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Status</p>
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              <span className="font-semibold">Changes Detected</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Screenshots</p>
            <p className="text-2xl font-bold">{screenshots.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Changed Screens</p>
            <p className="text-2xl font-bold text-warning">{run.changes}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Unchanged Screens</p>
            <p className="text-2xl font-bold text-success">
              {screenshots.length - run.changes}
            </p>
          </div>
        </div>
      </Card>

      {/* Screenshots */}
      <div>
        <h2 className="text-xl font-bold mb-6">Screenshots</h2>
        <Accordion type="multiple" className="space-y-4">
          {screenshots.map((screenshot) => {
            const changeLevelInfo = getChangeLevelInfo(screenshot.changeLevel);
            const ChangeLevelIcon = changeLevelInfo.icon;
            
            return (
              <AccordionItem 
                key={screenshot.id} 
                value={`screenshot-${screenshot.id}`}
                className="border rounded-lg bg-gradient-card shadow-card"
              >
                <AccordionTrigger className="px-6 hover:no-underline">
                  <div className="flex flex-col w-full pr-4 gap-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{screenshot.screen}</h3>
                      <Badge 
                        variant={changeLevelInfo.variant === "success" ? "default" : "outline"}
                        className={
                          changeLevelInfo.variant === "success" ? "bg-success hover:bg-success" :
                          changeLevelInfo.variant === "warning" ? "border-warning text-warning" :
                          changeLevelInfo.variant === "destructive" ? "border-destructive text-destructive" :
                          ""
                        }
                      >
                        <ChangeLevelIcon className="w-3 h-3 mr-1" />
                        {changeLevelInfo.label}
                      </Badge>
                      {screenshot.hasBaseline && (
                        <Badge variant="outline" className="border-primary text-primary">
                          Baseline #{screenshot.id}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-0">
                      {screenshot.changeLevel !== "no-changes" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs text-muted-foreground hover:text-foreground h-7"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetScreenshotBaseline(screenshot.screen);
                          }}
                        >
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          New Baseline
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs text-muted-foreground hover:text-foreground h-7"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.error(`Test marked as wrong for ${screenshot.screen}`);
                        }}
                      >
                        <XCircle className="w-3 h-3 mr-1" />
                        Wrong Test
                      </Button>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={screenshotViewModes[screenshot.id] !== "overlay" ? "default" : "outline"}
                        onClick={() => setScreenshotViewModes(prev => ({ ...prev, [screenshot.id]: "grid" }))}
                      >
                        Grid View
                      </Button>
                      <Button
                        size="sm"
                        variant={screenshotViewModes[screenshot.id] === "overlay" ? "default" : "outline"}
                        onClick={() => setScreenshotViewModes(prev => ({ ...prev, [screenshot.id]: "overlay" }))}
                      >
                        Overlay View
                      </Button>
                    </div>
                    {screenshotViewModes[screenshot.id] === "overlay" && (
                      <div className="flex items-center gap-3 min-w-[200px]">
                        <span className="text-sm text-muted-foreground">Opacity:</span>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={overlayOpacity[screenshot.id] ?? 50}
                          onChange={(e) => setOverlayOpacity(prev => ({ ...prev, [screenshot.id]: parseInt(e.target.value) }))}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium w-12">{overlayOpacity[screenshot.id] ?? 50}%</span>
                      </div>
                    )}
                  </div>
                  <Link to={`/run/${id}/screenshot/${screenshot.screen.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Card className="p-4 bg-background/50 hover:bg-background/80 transition-all cursor-pointer">
                      {screenshotViewModes[screenshot.id] === "overlay" ? (
                        <div className="flex justify-center">
                          <div className="w-1/3">
                            <p className="text-sm font-medium text-muted-foreground mb-2">Overlay Comparison</p>
                            <div className="aspect-[9/16] bg-muted/20 rounded border border-primary/30 overflow-hidden relative">
                              <img 
                                src={screenshot.baseline} 
                                alt="Baseline" 
                                className="w-full h-full object-contain absolute inset-0"
                              />
                              <img 
                                src={screenshot.actual} 
                                alt="Actual" 
                                className="w-full h-full object-contain absolute inset-0 transition-opacity duration-200"
                                style={{ opacity: (overlayOpacity[screenshot.id] ?? 50) / 100 }}
                              />
                              <div className="absolute top-2 left-2 bg-background/90 px-2 py-1 rounded text-xs font-medium">
                                Baseline
                              </div>
                              <div className="absolute top-2 right-2 bg-background/90 px-2 py-1 rounded text-xs font-medium">
                                Actual
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">Baseline</p>
                            <div className="aspect-[9/16] bg-muted/20 rounded border border-primary/30 overflow-hidden relative">
                              <img 
                                src={screenshot.baseline} 
                                alt="Baseline" 
                                className="w-full h-full object-contain"
                              />
                              <div className="absolute top-2 left-2 bg-background/90 px-2 py-1 rounded text-xs font-medium">
                                No fail
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">Actual</p>
                            <div className="aspect-[9/16] bg-muted/20 rounded border border-warning/30 overflow-hidden relative">
                              <img 
                                src={screenshot.actual} 
                                alt="Actual" 
                                className="w-full h-full object-contain"
                              />
                              <div className="absolute top-2 left-2 bg-background/90 px-2 py-1 rounded text-xs font-medium">
                                No fail
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">Diff</p>
                            <div className="aspect-[9/16] bg-muted/20 rounded border border-destructive/30 overflow-hidden">
                              <img 
                                src={screenshot.diff} 
                                alt="Diff" 
                                className="w-full h-full object-contain"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </Card>
                  </Link>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default RunDetail;
