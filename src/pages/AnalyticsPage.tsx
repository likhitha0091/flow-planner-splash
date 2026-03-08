import { useMemo } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, CheckCircle2, Clock, BookOpen, Loader2 } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";
import { useSubjects } from "@/hooks/useSubjects";
import { useStudySessions } from "@/hooks/useStudySessions";

const AnalyticsPage = () => {
  const { tasks, isLoading: tasksLoading } = useTasks();
  const { subjects, isLoading: subjectsLoading } = useSubjects();
  const { sessions, isLoading: sessionsLoading } = useStudySessions();

  const isLoading = tasksLoading || subjectsLoading || sessionsLoading;

  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = tasks.filter((t) => !t.completed).length;
  const totalStudyMinutes = sessions.filter((s) => s.type === "study").reduce((a, s) => a + s.duration_minutes, 0);
  const studyHours = Math.round(totalStudyMinutes / 60 * 10) / 10;
  const productivity = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const taskBreakdown = useMemo(() => {
    const overdue = tasks.filter((t) => !t.completed && t.deadline && new Date(t.deadline) < new Date()).length;
    const pending = pendingTasks - overdue;
    return [
      { label: "Completed", value: completedTasks, color: "bg-accent" },
      { label: "Pending", value: pending, color: "bg-primary" },
      { label: "Overdue", value: overdue, color: "bg-rose-500" },
    ].filter((t) => t.value > 0);
  }, [tasks, completedTasks, pendingTasks]);

  const totalBreakdown = taskBreakdown.reduce((a, b) => a + b.value, 0);

  const weeklyHours = useMemo(() => {
    const now = new Date();
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map((day, i) => {
      const target = new Date(now);
      const currentDay = now.getDay();
      const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
      target.setDate(now.getDate() + mondayOffset + i);
      const dateStr = target.toISOString().split("T")[0];
      const mins = sessions.filter((s) => s.type === "study" && s.completed_at.startsWith(dateStr)).reduce((a, s) => a + s.duration_minutes, 0);
      return { day, hours: Math.round(mins / 60 * 10) / 10 };
    });
  }, [sessions]);

  const maxHours = Math.max(...weeklyHours.map((d) => d.hours), 1);

  if (isLoading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Track your study performance</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: CheckCircle2, label: "Tasks Completed", value: String(completedTasks), color: "text-accent" },
          { icon: Clock, label: "Study Hours", value: `${studyHours}h`, color: "text-primary" },
          { icon: TrendingUp, label: "Productivity", value: `${productivity}%`, color: "text-primary" },
          { icon: BookOpen, label: "Active Subjects", value: String(subjects.length), color: "text-accent" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06 }} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card hover:shadow-card-hover transition-shadow p-5">
            <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-primary" />
            <h2 className="font-display font-bold text-foreground">Weekly Study Hours</h2>
          </div>
          <div className="flex items-end gap-3 h-48">
            {weeklyHours.map((d, i) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-xs font-medium text-foreground">{d.hours > 0 ? `${d.hours}h` : ""}</span>
                <motion.div className="w-full rounded-t-lg gradient-primary min-h-[4px]" initial={{ height: 0 }} animate={{ height: `${(d.hours / maxHours) * 100}%` }} transition={{ delay: 0.4 + i * 0.08, duration: 0.8, ease: "easeOut" }} />
                <span className="text-[10px] text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card p-6">
          <h2 className="font-display font-bold text-foreground mb-4">Task Breakdown</h2>
          {totalBreakdown === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No tasks yet</p>
          ) : (
            <div className="flex items-center gap-6 mb-6">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  {taskBreakdown.reduce((acc, item, i) => {
                    const pct = (item.value / totalBreakdown) * 100;
                    const offset = acc.offset;
                    const colors = ["hsl(var(--accent))", "hsl(var(--primary))", "#f43f5e"];
                    acc.elements.push(<circle key={i} cx="60" cy="60" r="50" fill="none" stroke={colors[i]} strokeWidth="16" strokeDasharray={`${(pct / 100) * 314.16} ${314.16}`} strokeDashoffset={-offset} />);
                    acc.offset = offset + (pct / 100) * 314.16;
                    return acc;
                  }, { elements: [] as JSX.Element[], offset: 0 }).elements}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-foreground">{totalBreakdown}</span>
                </div>
              </div>
              <div className="space-y-2 flex-1">
                {taskBreakdown.map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-sm ${item.color}`} />
                    <span className="text-xs text-muted-foreground flex-1">{item.label}</span>
                    <span className="text-xs font-medium text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card p-6">
        <h2 className="font-display font-bold text-foreground mb-4">Subject-wise Progress</h2>
        {subjects.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">Add subjects to see progress</p>
        ) : (
          <div className="space-y-4">
            {subjects.map((s, i) => {
              const pct = (s.task_count || 0) > 0 ? Math.round(((s.completed_count || 0) / (s.task_count || 1)) * 100) : 0;
              return (
                <div key={s.id} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{s.name}</span>
                    <span className="text-foreground font-medium">{s.completed_count || 0}/{s.task_count || 0} tasks · {pct}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
                    <motion.div className={`h-full rounded-full ${s.color}`} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.5 + i * 0.1, duration: 1, ease: "easeOut" }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AnalyticsPage;
