import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Circle, Clock, TrendingUp, BookOpen, Target } from "lucide-react";

const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) { setDisplay(0); return; }
    const duration = 1500;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{display}{suffix}</span>;
};

const AnimatedBar = ({ width, delay = 0 }: { width: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-30px" });

  return (
    <div ref={ref} className="h-2 rounded-full bg-secondary overflow-hidden">
      <motion.div
        className="h-full rounded-full gradient-primary"
        initial={{ width: 0 }}
        animate={inView ? { width } : { width: 0 }}
        transition={{ delay: 0.3 + delay, duration: 1.2, ease: "easeOut" }}
      />
    </div>
  );
};

const tasks = [
  { text: "Complete Calculus Assignment", done: true, subject: "Math" },
  { text: "Read Chapter 7 – Thermodynamics", done: true, subject: "Physics" },
  { text: "Write Essay on AI Ethics", done: false, subject: "CS" },
  { text: "Biology Lab Notes", done: false, subject: "Biology" },
];

const stats = [
  { icon: Clock, label: "Study Hours", value: 32, suffix: "h" },
  { icon: Target, label: "Tasks Done", value: 18, suffix: "" },
  { icon: TrendingUp, label: "Streak", value: 7, suffix: " days" },
  { icon: BookOpen, label: "Subjects", value: 5, suffix: "" },
];

const barData = [
  { day: "Mon", pct: 43 },
  { day: "Tue", pct: 71 },
  { day: "Wed", pct: 29 },
  { day: "Thu", pct: 86 },
  { day: "Fri", pct: 57 },
  { day: "Sat", pct: 100 },
  { day: "Sun", pct: 43 },
];

const ProductPreview = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
            Preview
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Your study dashboard, reimagined
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            A clean, intelligent workspace that keeps everything organized.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="rounded-2xl border border-border/50 shadow-card overflow-hidden bg-card/70 backdrop-blur-md"
        >
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display font-bold text-lg text-foreground">Welcome back, Alex 👋</h3>
                <p className="text-xs text-muted-foreground">Here's your study overview for today</p>
              </div>
              <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-xs text-primary-foreground font-bold">
                A
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="rounded-xl bg-secondary/40 p-4 text-center"
                >
                  <stat.icon className="w-4 h-4 mx-auto mb-1.5 text-primary" />
                  <p className="text-lg font-bold text-foreground">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Tasks */}
              <div>
                <h4 className="font-display font-semibold text-sm text-foreground mb-3">Today's Tasks</h4>
                <div className="space-y-2">
                  {tasks.map((task, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                    >
                      {task.done ? (
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-muted-foreground/40 shrink-0" />
                      )}
                      <span className={`text-xs flex-1 ${task.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                        {task.text}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                        {task.subject}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 space-y-3">
                  <h4 className="font-display font-semibold text-sm text-foreground">Subject Progress</h4>
                  {[
                    { name: "Mathematics", pct: "85%" },
                    { name: "Physics", pct: "62%" },
                    { name: "Computer Science", pct: "91%" },
                  ].map((s, i) => (
                    <div key={s.name} className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-muted-foreground">{s.name}</span>
                        <span className="text-foreground font-medium">{s.pct}</span>
                      </div>
                      <AnimatedBar width={s.pct} delay={i * 0.15} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart + schedule */}
              <div>
                <h4 className="font-display font-semibold text-sm text-foreground mb-3">Weekly Study Hours</h4>
                <div className="flex items-end gap-2 h-40 px-2">
                  {barData.map((d, i) => (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <motion.div
                        className="w-full rounded-t-md gradient-primary min-h-[4px]"
                        initial={{ height: 0 }}
                        animate={inView ? { height: `${d.pct}%` } : { height: 0 }}
                        transition={{ delay: 0.5 + i * 0.08, duration: 0.8, ease: "easeOut" }}
                      />
                      <span className="text-[9px] text-muted-foreground">{d.day}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h4 className="font-display font-semibold text-sm text-foreground mb-3">Today's Schedule</h4>
                  <div className="space-y-2">
                    {[
                      { time: "9:00", subject: "Mathematics", color: "bg-primary" },
                      { time: "11:00", subject: "Physics Lab", color: "bg-accent" },
                      { time: "14:00", subject: "CS Lecture", color: "bg-primary/70" },
                    ].map((slot, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                        className="flex items-center gap-3 p-2.5 rounded-lg bg-secondary/20"
                      >
                        <div className={`w-1.5 h-8 rounded-full ${slot.color}`} />
                        <div>
                          <p className="text-xs font-medium text-foreground">{slot.subject}</p>
                          <p className="text-[10px] text-muted-foreground">{slot.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductPreview;
