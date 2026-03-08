import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Sparkles, CheckCircle2, BarChart3, Clock,
  BookOpen, TrendingUp, Circle,
} from "lucide-react";

const FloatingCard = ({
  children,
  className = "",
  delay = 0,
  dx = 0,
  dy = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  dx?: number;
  dy?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.8 + delay, duration: 0.7, ease: "easeOut" }}
    className={`absolute hidden lg:block ${className}`}
  >
    <motion.div
      animate={{ y: [0, dy, 0], x: [0, dx, 0] }}
      transition={{ duration: 7 + delay * 3, repeat: Infinity, ease: "easeInOut" }}
      className="rounded-xl bg-card/80 backdrop-blur-md border border-border/60 shadow-card p-3"
    >
      {children}
    </motion.div>
  </motion.div>
);

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
    {/* Floating UI previews */}
    <FloatingCard className="top-[20%] left-[5%]" delay={0} dy={-10} dx={6}>
      <div className="flex items-center gap-2 text-xs">
        <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
        <span className="text-foreground font-medium">Linear Algebra</span>
        <span className="text-[10px] text-accent font-medium">Done</span>
      </div>
    </FloatingCard>

    <FloatingCard className="top-[16%] right-[7%]" delay={0.15} dy={12} dx={-5}>
      <div className="flex items-center gap-2.5 text-xs">
        <Clock className="w-3.5 h-3.5 text-primary" />
        <div>
          <span className="text-foreground font-semibold">25:00</span>
          <span className="text-[10px] text-muted-foreground ml-1.5">Focus Timer</span>
        </div>
      </div>
    </FloatingCard>

    <FloatingCard className="bottom-[30%] left-[6%]" delay={0.3} dy={8} dx={5}>
      <div className="space-y-1.5 w-36">
        <div className="flex justify-between text-[10px]">
          <span className="text-muted-foreground">Weekly Progress</span>
          <span className="text-primary font-bold">78%</span>
        </div>
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full rounded-full gradient-primary"
            initial={{ width: 0 }}
            animate={{ width: "78%" }}
            transition={{ delay: 1.4, duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </FloatingCard>

    <FloatingCard className="bottom-[26%] right-[5%]" delay={0.5} dy={-9} dx={-6}>
      <div className="flex items-center gap-3 text-xs">
        <BarChart3 className="w-4 h-4 text-accent" />
        <div>
          <p className="text-foreground font-medium">Study Hours</p>
          <p className="text-[10px] text-muted-foreground">32h this week</p>
        </div>
      </div>
    </FloatingCard>

    <FloatingCard className="top-[42%] right-[3%]" delay={0.25} dy={7} dx={-4}>
      <div className="flex items-center gap-2 text-xs">
        <BookOpen className="w-3.5 h-3.5 text-primary" />
        <span className="text-foreground font-medium">3 tasks due today</span>
      </div>
    </FloatingCard>

    <FloatingCard className="top-[38%] left-[3%]" delay={0.45} dy={-6} dx={7}>
      <div className="flex items-center gap-2 text-xs">
        <TrendingUp className="w-3.5 h-3.5 text-accent" />
        <span className="text-foreground font-medium">7-day streak 🔥</span>
      </div>
    </FloatingCard>

    {/* Mini chart card */}
    <FloatingCard className="bottom-[42%] left-[12%]" delay={0.6} dy={10} dx={-3}>
      <div className="flex items-end gap-[3px] h-8">
        {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
          <motion.div
            key={i}
            className="w-2 rounded-t-sm gradient-primary"
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: 1.6 + i * 0.08, duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </div>
    </FloatingCard>

    {/* Task list card */}
    <FloatingCard className="bottom-[44%] right-[10%]" delay={0.35} dy={-8} dx={5}>
      <div className="space-y-1">
        {[
          { done: true, text: "Read Ch.5" },
          { done: false, text: "Essay draft" },
        ].map((t, i) => (
          <div key={i} className="flex items-center gap-1.5 text-[10px]">
            {t.done ? (
              <CheckCircle2 className="w-2.5 h-2.5 text-accent" />
            ) : (
              <Circle className="w-2.5 h-2.5 text-muted-foreground/40" />
            )}
            <span className={t.done ? "line-through text-muted-foreground" : "text-foreground"}>
              {t.text}
            </span>
          </div>
        ))}
      </div>
    </FloatingCard>

    {/* Hero content */}
    <div className="relative z-10 max-w-3xl mx-auto px-6 text-center py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.span
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6 backdrop-blur-sm"
          whileHover={{ scale: 1.05 }}
        >
          <Sparkles className="w-3 h-3" />
          AI-Powered Study Planning
        </motion.span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-foreground">
          Study<span className="text-gradient">Flow</span> AI
        </h1>
        <p className="font-display text-lg sm:text-xl text-muted-foreground mb-2 font-medium">
          Study smarter. Stay consistent.
        </p>
        <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
          An AI-powered study planner that helps you organize tasks, track progress,
          and stay focused — so you can achieve your academic goals effortlessly.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <Button variant="hero" size="lg" className="rounded-full px-8 text-base gap-2 group" asChild>
          <Link to="/auth">
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-xs text-muted-foreground mt-4"
      >
        Free to use · No credit card required
      </motion.p>
    </div>
  </section>
);

export default HeroSection;
