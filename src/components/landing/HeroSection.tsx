import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
    {/* Animated gradient background */}
    <motion.div
      className="absolute inset-0 gradient-hero"
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      style={{ backgroundSize: "200% 200%" }}
    />
    {/* Floating orbs */}
    <motion.div
      className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl"
      animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-accent/5 blur-3xl"
      animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />

    <div className="relative z-10 max-w-3xl mx-auto px-6 text-center py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
          <Sparkles className="w-3 h-3" />
          AI-Powered Study Planning
        </span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-foreground">
          Study<span className="text-gradient">Flow</span> AI
        </h1>
        <p className="font-display text-lg sm:text-xl text-muted-foreground mb-2 font-medium">
          Study Smarter. Stay Consistent.
        </p>
        <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
          AI-powered study planning and productivity tracking designed to help students
          organize, focus, and achieve their academic goals — effortlessly.
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
        Explore what StudyFlow AI can do ↓
      </motion.p>
    </div>
  </section>
);

export default HeroSection;
