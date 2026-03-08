import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import HomePage from "./pages/HomePage";
import SubjectsPage from "./pages/SubjectsPage";
import TasksPage from "./pages/TasksPage";
import CalendarPage from "./pages/CalendarPage";
import NotesPage from "./pages/NotesPage";
import TimerPage from "./pages/TimerPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AIToolsPage from "./pages/AIToolsPage";
import SettingsPage from "./pages/SettingsPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/home" element={<DashboardLayout><HomePage /></DashboardLayout>} />
            <Route path="/home/subjects" element={<DashboardLayout><SubjectsPage /></DashboardLayout>} />
            <Route path="/home/tasks" element={<DashboardLayout><TasksPage /></DashboardLayout>} />
            <Route path="/home/calendar" element={<DashboardLayout><CalendarPage /></DashboardLayout>} />
            <Route path="/home/notes" element={<DashboardLayout><NotesPage /></DashboardLayout>} />
            <Route path="/home/timer" element={<DashboardLayout><TimerPage /></DashboardLayout>} />
            <Route path="/home/analytics" element={<DashboardLayout><AnalyticsPage /></DashboardLayout>} />
            <Route path="/home/ai-tools" element={<DashboardLayout><AIToolsPage /></DashboardLayout>} />
            <Route path="/home/settings" element={<DashboardLayout><SettingsPage /></DashboardLayout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
