import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => (
  <section className="relative py-24 px-6 overflow-hidden">
    {/* Background effects */}
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-3xl"
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative max-w-3xl mx-auto text-center"
    >
      <div className="rounded-3xl gradient-card border border-border/50 shadow-card p-12 sm:p-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-primary/[0.04] blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to build better study habits?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8 text-sm leading-relaxed">
            Join students who are studying smarter, staying consistent, and achieving
            their academic goals with StudyFlow AI.
          </p>
          <Button variant="hero" size="lg" className="rounded-full px-10 text-base gap-2 group">
            Get Started — It's Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </motion.div>
  </section>
);

export default CTASection;
