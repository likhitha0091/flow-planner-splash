import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import {
  CheckCircle2, Circle, Clock, TrendingUp, BookOpen,
  Target, BarChart3, Calendar, Sparkles, ArrowRight,
} from "lucide-react";

const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setDisplay(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{display}{suffix}</span>;
};

const tasks = [
  { text: "Complete Calculus Assignment", done: true, subject: "Math", due: "Today" },
  { text: "Read Chapter 7 – Thermodynamics", done: true, subject: "Physics", due: "Today" },
  { text: "Write Essay on AI Ethics", done: false, subject: "CS", due: "Tomorrow" },
  { text: "Prepare Biology Lab Notes", done: false, subject: "Biology", due: "Wed" },
  { text: "Solve Practice Problems Set 3", done: false, subject: "Math", due: "Thu" },
];

const stats = [
  { icon: Clock, label: "Study Hours", value: 32, suffix: "h", color: "text-primary" },
  { icon: Target, label: "Tasks Done", value: 18, suffix: "", color: "text-accent" },
  { icon: TrendingUp, label: "Day Streak", value: 7, suffix: "", color: "text-primary" },
  { icon: BookOpen, label: "Subjects", value: 5, suffix: "", color: "text-accent" },
];

const schedule = [
  { time: "9:00 AM", subject: "Mathematics", topic: "Calculus Review", color: "bg-primary" },
  { time: "11:00 AM", subject: "Physics Lab", topic: "Wave Mechanics", color: "bg-accent" },
  { time: "2:00 PM", subject: "CS Lecture", topic: "Data Structures", color: "bg-primary/70" },
  { time: "4:00 PM", subject: "Biology", topic: "Quick Revision", color: "bg-accent/70" },
];

const HomePage = () => {
  const { user } = useAuth();
  const name = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Student";

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
          Welcome back, {name} 👋
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Here's your study overview for today</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card hover:shadow-card-hover transition-shadow p-5"
          >
            <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
            <p className="text-2xl font-bold text-foreground">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="lg:col-span-2 bg-card/70 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-foreground">Today's Tasks</h2>
            <span className="text-xs text-muted-foreground">2 of 5 done</span>
          </div>
          <div className="space-y-2">
            {tasks.map((task, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.06, duration: 0.3 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-secondary/20 hover:bg-secondary/40 transition-colors group cursor-default"
              >
                {task.done ? (
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-muted-foreground/40 shrink-0 group-hover:text-primary/60 transition-colors" />
                )}
                <span className={`text-sm flex-1 ${task.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {task.text}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                  {task.subject}
                </span>
                <span className="text-[10px] text-muted-foreground">{task.due}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-primary" />
            <h2 className="font-display font-bold text-foreground">Today's Schedule</h2>
          </div>
          <div className="space-y-3">
            {schedule.map((slot, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.3 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-secondary/20 hover:bg-secondary/40 transition-colors"
              >
                <div className={`w-1.5 h-10 rounded-full ${slot.color}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{slot.subject}</p>
                  <p className="text-[10px] text-muted-foreground">{slot.topic}</p>
                </div>
                <span className="text-[10px] text-muted-foreground">{slot.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom row */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card p-6"
        >
          <h2 className="font-display font-bold text-foreground mb-4">Subject Progress</h2>
          <div className="space-y-3">
            {[
              { name: "Mathematics", pct: 85 },
              { name: "Physics", pct: 62 },
              { name: "Computer Science", pct: 91 },
              { name: "Biology", pct: 45 },
            ].map((s, i) => (
              <div key={s.name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{s.name}</span>
                  <span className="text-foreground font-medium">{s.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    className="h-full rounded-full gradient-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${s.pct}%` }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Weekly chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="bg-card/70 backdrop-blur-sm rounded-2xl border border-border/50 shadow-card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-accent" />
            <h2 className="font-display font-bold text-foreground">Weekly Hours</h2>
          </div>
          <div className="flex items-end gap-2 h-32">
            {[3, 5, 2, 6, 4, 7, 3].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <motion.div
                  className="w-full rounded-t-md gradient-primary min-h-[4px]"
                  initial={{ height: 0 }}
                  animate={{ height: `${(h / 7) * 100}%` }}
                  transition={{ delay: 0.7 + i * 0.06, duration: 0.7, ease: "easeOut" }}
                />
                <span className="text-[9px] text-muted-foreground">
                  {["M", "T", "W", "T", "F", "S", "S"][i]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-card/70 backdrop-blur-sm rounded-2xl border border-primary/20 shadow-card p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <h2 className="font-display font-bold text-foreground">AI Suggestion</h2>
          </div>
          <div className="rounded-xl bg-primary/5 border border-primary/10 p-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Based on your progress, focus on <span className="text-foreground font-medium">Physics</span> and{" "}
              <span className="text-foreground font-medium">Biology</span> this week.
              Allocate 2 hours daily for each to catch up before exams.
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
