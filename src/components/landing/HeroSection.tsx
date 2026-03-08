import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center pt-16 gradient-hero overflow-hidden">
    {/* Glow */}
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

    <div className="relative z-10 max-w-3xl mx-auto px-6 text-center py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
          AI-Powered Study Planning
        </span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-foreground">
          Study<span className="text-gradient">Flow</span> AI
        </h1>
        <p className="font-display text-lg sm:text-xl text-muted-foreground mb-2 font-medium">
          Your Intelligent Study Companion
        </p>
        <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
          AI-powered study planning and productivity tracking for students. 
          Organize, focus, and achieve more — effortlessly.
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
        Scroll down to explore the app ↓
      </motion.p>
    </div>
  </section>
);

export default HeroSection;
