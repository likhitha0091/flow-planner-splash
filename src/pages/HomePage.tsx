import { useMemo } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import {
  CheckCircle2, Circle, Clock, TrendingUp, BookOpen,
  Target, BarChart3, Calendar, Sparkles, Loader2,
} from "lucide-react";
import { useTasks } from "@/hooks/useTasks";
import { useSubjects } from "@/hooks/useSubjects";
import { useStudySessions } from "@/hooks/useStudySessions";

const HomePage = () => {
  const { user } = useAuth();
  const { tasks, isLoading: tasksLoading } = useTasks();
  const { subjects, isLoading: subjectsLoading } = useSubjects();
  const { sessions, isLoading: sessionsLoading } = useStudySessions();
  const name = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Student";

  const isLoading = tasksLoading || subjectsLoading || sessionsLoading;

  const totalStudyMinutes = sessions.filter((s) => s.type === "study").reduce((a, s) => a + s.duration_minutes, 0);
  const studyHours = Math.round(totalStudyMinutes / 60);
  const completedTasks = tasks.filter((t) => t.completed).length;

  const todayStr = new Date().toISOString().split("T")[0];
  const todayTasks = useMemo(() => {
    return tasks.filter((t) => t.deadline === todayStr || (!t.deadline && new Date(t.created_at).toISOString().split("T")[0] === todayStr));
  }, [tasks, todayStr]);

  const upcomingTasks = useMemo(() => {
    return tasks.filter((t) => !t.completed && t.deadline && t.deadline >= todayStr).sort((a, b) => (a.deadline || "").localeCompare(b.deadline || "")).slice(0, 5);
  }, [tasks, todayStr]);

  const weeklyHours = useMemo(() => {
    const now = new Date();
    const days = ["M", "T", "W", "T", "F", "S", "S"];
    return days.map((d, i) => {
      const target = new Date(now);
      const currentDay = now.getDay();
      const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
      target.setDate(now.getDate() + mondayOffset + i);
      const dateStr = target.toISOString().split("T")[0];
      const mins = sessions.filter((s) => s.type === "study" && s.completed_at.startsWith(dateStr)).reduce((a, s) => a + s.duration_minutes, 0);
      return { day: d, hours: Math.round(mins / 60 * 10) / 10 };
    });
  }, [sessions]);

  const maxHours = Math.max(...weeklyHours.map((d) => d.hours), 1);

  const stats = [
    { icon: Clock, label: "Study Hours", value: `${studyHours}h`, color: "text-primary" },
    { icon: Target, label: "Tasks Done", value: String(completedTasks), color: "text-accent" },
    { icon: TrendingUp, label: "Total Tasks", value: String(tasks.length), color: "text-primary" },
    { icon: BookOpen, label: "Subjects", value: String(subjects.length), color: "text-accent" },
  ];

  // Find weakest subjects for AI suggestion
  const weakSubjects = useMemo(() => {
    return subjects
      .filter((s) => (s.task_count || 0) > 0)
      .map((s) => ({ name: s.name, pct: Math.round(((s.completed_count || 0) / (s.task_count || 1)) * 100) }))
      .sort((a, b) => a.pct - b.pct)
      .slice(0, 2);
  }, [subjects]);

  if (isLoading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Welcome back, {name} 👋</h1>
        <p className="text-sm text-muted-foreground mt-1">Here's your study overview for today</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card hover:shadow-card-hover transition-shadow p-5">
            <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2 bg-card/70 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-foreground">Today's Tasks</h2>
            <span className="text-xs text-muted-foreground">{todayTasks.filter(t => t.completed).length} of {todayTasks.length} done</span>
          </div>
          {todayTasks.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No tasks for today</p>
          ) : (
            <div className="space-y-2">
              {todayTasks.map((task, i) => (
                <motion.div key={task.id} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.06 }} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/20 hover:bg-secondary/40 transition-colors">
                  {task.completed ? <CheckCircle2 className="w-4 h-4 text-accent shrink-0" /> : <Circle className="w-4 h-4 text-muted-foreground/40 shrink-0" />}
                  <span className={`text-sm flex-1 ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>{task.title}</span>
                  {task.subject_name && <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{task.subject_name}</span>}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-primary" />
            <h2 className="font-display font-bold text-foreground">Upcoming Deadlines</h2>
          </div>
          {upcomingTasks.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No upcoming deadlines</p>
          ) : (
            <div className="space-y-3">
              {upcomingTasks.map((task, i) => (
                <motion.div key={task.id} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.08 }} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/20 hover:bg-secondary/40 transition-colors">
                  <div className="w-1.5 h-10 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{task.title}</p>
                    {task.subject_name && <p className="text-[10px] text-muted-foreground">{task.subject_name}</p>}
                  </div>
                  <span className="text-[10px] text-muted-foreground">{task.deadline}</span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card p-6">
          <h2 className="font-display font-bold text-foreground mb-4">Subject Progress</h2>
          {subjects.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">Add subjects to track progress</p>
          ) : (
            <div className="space-y-3">
              {subjects.slice(0, 4).map((s, i) => {
                const pct = (s.task_count || 0) > 0 ? Math.round(((s.completed_count || 0) / (s.task_count || 1)) * 100) : 0;
                return (
                  <div key={s.id} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{s.name}</span>
                      <span className="text-foreground font-medium">{pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <motion.div className={`h-full rounded-full ${s.color}`} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.6 + i * 0.1, duration: 1, ease: "easeOut" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-accent" />
            <h2 className="font-display font-bold text-foreground">Weekly Hours</h2>
          </div>
          <div className="flex items-end gap-2 h-32">
            {weeklyHours.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <motion.div className="w-full rounded-t-md gradient-primary min-h-[4px]" initial={{ height: 0 }} animate={{ height: `${(h.hours / maxHours) * 100}%` }} transition={{ delay: 0.7 + i * 0.06, duration: 0.7, ease: "easeOut" }} />
                <span className="text-[9px] text-muted-foreground">{h.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-card/70 backdrop-blur-sm rounded-2xl border border-primary/20 shadow-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <h2 className="font-display font-bold text-foreground">AI Suggestion</h2>
          </div>
          <div className="rounded-xl bg-primary/5 border border-primary/10 p-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {weakSubjects.length > 0 ? (
                <>Based on your progress, focus on <span className="text-foreground font-medium">{weakSubjects.map(s => s.name).join(" and ")}</span> this week to improve your completion rate.</>
              ) : tasks.length === 0 ? (
                "Start by adding subjects and tasks to get personalized study recommendations."
              ) : (
                "Great work! Keep up the momentum with your current study plan."
              )}
            </p>
          </div>
          <p className="text-[10px] text-muted-foreground mt-3 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full gradient-primary inline-block animate-pulse" />
            AI-generated recommendation
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
