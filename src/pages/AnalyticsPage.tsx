import { motion } from "framer-motion";
import { BarChart3, TrendingUp, CheckCircle2, Clock, BookOpen } from "lucide-react";

const weeklyHours = [
  { day: "Mon", hours: 3 }, { day: "Tue", hours: 5 }, { day: "Wed", hours: 2 },
  { day: "Thu", hours: 6 }, { day: "Fri", hours: 4 }, { day: "Sat", hours: 7 }, { day: "Sun", hours: 3 },
];

const subjectProgress = [
  { name: "Mathematics", completed: 8, total: 12, color: "bg-primary" },
  { name: "Physics", completed: 5, total: 8, color: "bg-accent" },
  { name: "Computer Science", completed: 13, total: 15, color: "bg-purple-500" },
  { name: "Biology", completed: 4, total: 10, color: "bg-emerald-500" },
  { name: "English", completed: 3, total: 6, color: "bg-rose-500" },
];

const taskBreakdown = [
  { label: "Completed", value: 33, color: "bg-accent" },
  { label: "In Progress", value: 12, color: "bg-primary" },
  { label: "Pending", value: 8, color: "bg-amber-500" },
  { label: "Overdue", value: 3, color: "bg-rose-500" },
];

const totalTasks = taskBreakdown.reduce((a, b) => a + b.value, 0);

const AnalyticsPage = () => (
  <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Analytics</h1>
      <p className="text-sm text-muted-foreground mt-1">Track your study performance</p>
    </motion.div>

    {/* Summary cards */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { icon: CheckCircle2, label: "Tasks Completed", value: "33", color: "text-accent" },
        { icon: Clock, label: "Study Hours", value: "30h", color: "text-primary" },
        { icon: TrendingUp, label: "Productivity", value: "87%", color: "text-primary" },
        { icon: BookOpen, label: "Active Subjects", value: "5", color: "text-accent" },
      ].map((stat, i) => (
        <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06 }} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card hover:shadow-card-hover transition-shadow p-5">
          <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
        </motion.div>
      ))}
    </div>

    <div className="grid lg:grid-cols-2 gap-6">
      {/* Weekly hours */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-4 h-4 text-primary" />
          <h2 className="font-display font-bold text-foreground">Weekly Study Hours</h2>
        </div>
        <div className="flex items-end gap-3 h-48">
          {weeklyHours.map((d, i) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <span className="text-xs font-medium text-foreground">{d.hours}h</span>
              <motion.div
                className="w-full rounded-t-lg gradient-primary min-h-[4px]"
                initial={{ height: 0 }}
                animate={{ height: `${(d.hours / 7) * 100}%` }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.8, ease: "easeOut" }}
              />
              <span className="text-[10px] text-muted-foreground">{d.day}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Task breakdown */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card p-6">
        <h2 className="font-display font-bold text-foreground mb-4">Task Breakdown</h2>
        <div className="flex items-center gap-6 mb-6">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              {taskBreakdown.reduce((acc, item, i) => {
                const pct = (item.value / totalTasks) * 100;
                const offset = acc.offset;
                const colors = ["hsl(var(--accent))", "hsl(var(--primary))", "#f59e0b", "#f43f5e"];
                acc.elements.push(
                  <circle key={i} cx="60" cy="60" r="50" fill="none" stroke={colors[i]} strokeWidth="16"
                    strokeDasharray={`${(pct / 100) * 314.16} ${314.16}`} strokeDashoffset={-offset} />
                );
                acc.offset = offset + (pct / 100) * 314.16;
                return acc;
              }, { elements: [] as JSX.Element[], offset: 0 }).elements}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-foreground">{totalTasks}</span>
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
      </motion.div>
    </div>

    {/* Subject progress */}
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card p-6">
      <h2 className="font-display font-bold text-foreground mb-4">Subject-wise Progress</h2>
      <div className="space-y-4">
        {subjectProgress.map((s, i) => {
          const pct = Math.round((s.completed / s.total) * 100);
          return (
            <div key={s.name} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">{s.name}</span>
                <span className="text-foreground font-medium">{s.completed}/{s.total} tasks · {pct}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
                <motion.div className={`h-full rounded-full ${s.color}`} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.5 + i * 0.1, duration: 1, ease: "easeOut" }} />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  </div>
);

export default AnalyticsPage;
