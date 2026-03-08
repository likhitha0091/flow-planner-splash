import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle2, BarChart3, Clock, BookOpen } from "lucide-react";

const FloatingCard = ({
  children,
  className,
  delay = 0,
  x = 0,
  y = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.6 + delay, duration: 0.6, ease: "easeOut" }}
    className={`absolute hidden lg:block ${className}`}
  >
    <motion.div
      animate={{ y: [0, y, 0], x: [0, x, 0] }}
      transition={{ duration: 6 + delay * 2, repeat: Infinity, ease: "easeInOut" }}
      className="rounded-xl bg-card/90 backdrop-blur-sm border border-border/60 shadow-card p-3"
    >
      {children}
    </motion.div>
  </motion.div>
);

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
    {/* Layered background */}
    <div className="absolute inset-0 gradient-hero" />
    <div className="absolute inset-0 bg-grid-pattern" />

    {/* Glowing shapes */}
    <motion.div
      className="absolute top-20 left-[10%] w-80 h-80 rounded-full bg-primary/[0.04] blur-3xl"
      animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-20 right-[10%] w-72 h-72 rounded-full bg-accent/[0.05] blur-3xl"
      animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/[0.02] blur-3xl"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Floating UI previews */}
    <FloatingCard className="top-[22%] left-[6%]" delay={0} y={-8} x={5}>
      <div className="flex items-center gap-2 text-xs">
        <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
        <span className="text-foreground font-medium">Linear Algebra</span>
        <span className="text-muted-foreground ml-1">Done</span>
      </div>
    </FloatingCard>

    <FloatingCard className="top-[18%] right-[8%]" delay={0.2} y={10} x={-6}>
      <div className="flex items-center gap-2 text-xs">
        <Clock className="w-3.5 h-3.5 text-primary" />
        <span className="text-foreground font-medium">25:00</span>
        <span className="text-[10px] text-muted-foreground">Focus Timer</span>
      </div>
    </FloatingCard>

    <FloatingCard className="bottom-[28%] left-[8%]" delay={0.4} y={8} x={4}>
      <div className="space-y-1.5 w-32">
        <div className="flex justify-between text-[10px]">
          <span className="text-muted-foreground">Weekly Progress</span>
          <span className="text-primary font-semibold">78%</span>
        </div>
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full rounded-full gradient-primary"
            initial={{ width: 0 }}
            animate={{ width: "78%" }}
            transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </FloatingCard>

    <FloatingCard className="bottom-[24%] right-[6%]" delay={0.6} y={-10} x={-4}>
      <div className="flex items-center gap-3 text-xs">
        <BarChart3 className="w-4 h-4 text-accent" />
        <div>
          <p className="text-foreground font-medium">Study Hours</p>
          <p className="text-[10px] text-muted-foreground">32h this week</p>
        </div>
      </div>
    </FloatingCard>

    <FloatingCard className="top-[40%] right-[4%]" delay={0.3} y={6} x={-8}>
      <div className="flex items-center gap-2 text-xs">
        <BookOpen className="w-3.5 h-3.5 text-primary" />
        <span className="text-foreground font-medium">3 tasks due today</span>
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
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6"
          whileHover={{ scale: 1.05 }}
        >
          <Sparkles className="w-3 h-3" />
          AI-Powered Study Planning
        </motion.span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-foreground">
          Study<span className="text-gradient">Flow</span> AI
        </h1>
        <p className="font-display text-lg sm:text-xl text-muted-foreground mb-2 font-medium">
          Build Better Study Habits.
        </p>
        <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
          An AI-powered study planner that helps you organize your tasks, track your
          progress, and stay focused — so you can study smarter, not harder.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <Button variant="hero" size="lg" className="rounded-full px-8 text-base gap-2 group">
          Get Started
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
