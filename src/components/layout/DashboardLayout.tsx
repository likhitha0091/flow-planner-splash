import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home, BookOpen, ClipboardList, Calendar, FileText,
  Timer, BarChart3, Settings, LogOut, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", icon: Home, path: "/home" },
  { label: "Subjects", icon: BookOpen, path: "/home/subjects" },
  { label: "Tasks", icon: ClipboardList, path: "/home/tasks" },
  { label: "Calendar", icon: Calendar, path: "/home/calendar" },
  { label: "Notes", icon: FileText, path: "/home/notes" },
  { label: "Study Timer", icon: Timer, path: "/home/timer" },
  { label: "Analytics", icon: BarChart3, path: "/home/analytics" },
  { label: "Settings", icon: Settings, path: "/home/settings" },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!user) return null;

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.25 }}
        className="fixed left-0 top-0 h-screen bg-card/80 backdrop-blur-md border-r border-border/50 flex flex-col z-40"
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-2 px-4 border-b border-border/50">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-display font-bold text-sm text-foreground whitespace-nowrap"
            >
              StudyFlow AI
            </motion.span>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                }`}
              >
                <item.icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? "text-primary" : "group-hover:text-foreground"}`} />
                {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-2 border-t border-border/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
          >
            <LogOut className="w-4.5 h-4.5 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border/50 shadow-soft flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </motion.aside>

      {/* Main content */}
      <motion.main
        animate={{ marginLeft: collapsed ? 72 : 240 }}
        transition={{ duration: 0.25 }}
        className="flex-1 min-h-screen"
      >
        {children}
      </motion.main>
    </div>
  );
};

export default DashboardLayout;
