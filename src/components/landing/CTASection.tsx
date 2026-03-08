import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => (
  <section className="py-24 px-6">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-3xl mx-auto text-center"
    >
      <div className="relative rounded-3xl gradient-card border border-border/50 shadow-card p-12 sm:p-16 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-32 bg-accent/5 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to transform your study routine?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8 text-sm leading-relaxed">
            Join thousands of students who are studying smarter, staying consistent,
            and achieving their academic goals with StudyFlow AI.
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
