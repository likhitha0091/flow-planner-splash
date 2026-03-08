import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => (
  <section className="relative py-24 px-6 overflow-hidden">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      className="relative max-w-3xl mx-auto text-center"
    >
      <div className="rounded-3xl bg-card/70 backdrop-blur-md border border-border/50 shadow-card p-12 sm:p-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-primary/[0.04] blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-32 bg-accent/[0.04] blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to build better study habits?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8 text-sm leading-relaxed">
            Join students who are studying smarter, staying consistent, and achieving
            their academic goals with StudyFlow AI.
          </p>
          <Button variant="hero" size="lg" className="rounded-full px-10 text-base gap-2 group" asChild>
            <Link to="/auth">
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  </section>
);

export default CTASection;
