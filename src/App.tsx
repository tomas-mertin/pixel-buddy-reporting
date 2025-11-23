import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import ApplicationDetail from "./pages/ApplicationDetail";
import RunHistory from "./pages/RunHistory";
import RunDetail from "./pages/RunDetail";
import ScreenshotComparison from "./pages/ScreenshotComparison";
import Settings from "./pages/Settings";
import Appearance from "./pages/Appearance";
import Configuration from "./pages/Configuration";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="pixel-buddy-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Dashboard /></Layout>} />
            <Route path="/applications" element={<Layout><Applications /></Layout>} />
            <Route path="/app/:appId" element={<Layout><ApplicationDetail /></Layout>} />
            <Route path="/history" element={<Layout><RunHistory /></Layout>} />
            <Route path="/run/:id" element={<Layout><RunDetail /></Layout>} />
            <Route path="/run/:runId/screenshot/:screenId" element={<Layout><ScreenshotComparison /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            <Route path="/appearance" element={<Layout><Appearance /></Layout>} />
            <Route path="/configuration" element={<Layout><Configuration /></Layout>} />
            <Route path="/reports" element={<Layout><Reports /></Layout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
